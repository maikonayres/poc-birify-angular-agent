import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RestAuthRepository } from './rest-auth.repository';
import { SKIP_SESSION_EXPIRED_HANDLING } from '../../../../../core/http/interceptors/error-interceptor';
import { environment } from '../../../../../../environments/environment';

describe('RestAuthRepository', () => {
  let repository: RestAuthRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), RestAuthRepository],
    });

    repository = TestBed.inject(RestAuthRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('posts login and maps response', () => {
    repository.login('user@test.com', 'secret').subscribe((session) => {
      expect(session.accessToken).toBe('token');
      expect(session.session.email).toBe('user@test.com');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'user@test.com', password: 'secret' });
    expect(req.request.context.get(SKIP_SESSION_EXPIRED_HANDLING)).toBe(true);

    req.flush({
      accessToken: 'token',
      session: { id: '1', email: 'user@test.com', tenantId: 'tenant' },
    });
  });

  it('posts logout', () => {
    repository.logout().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('gets current user', () => {
    repository.getCurrentUser().subscribe((session) => {
      expect(session.accessToken).toBe('token');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/me`);
    expect(req.request.method).toBe('GET');
    req.flush({
      accessToken: 'token',
      session: { id: '1', email: 'user@test.com', tenantId: 'tenant' },
    });
  });
});
