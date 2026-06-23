import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { authInterceptor } from './auth-interceptor';
import { SessionPort } from '../../ports/session.port';

describe('authInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SessionPort,
          useValue: {
            getAccessToken: vi.fn(),
            isAuthenticated: vi.fn(),
            clearSession: vi.fn(),
          },
        },
      ],
    });
  });

  it('passes request unchanged when there is no token', async () => {
    const session = TestBed.inject(SessionPort);
    vi.mocked(session.getAccessToken).mockReturnValue(null);
    let capturedRequest: HttpRequest<unknown> | null = null;
    const request = new HttpRequest('GET', '/api/me');

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        authInterceptor(request, (nextRequest) => {
          capturedRequest = nextRequest;
          return of(new HttpResponse({ body: null }));
        }),
      ),
    );

    expect(capturedRequest!.headers.has('Authorization')).toBe(false);
  });

  it('adds Authorization header when token exists', async () => {
    const session = TestBed.inject(SessionPort);
    vi.mocked(session.getAccessToken).mockReturnValue('token-123');
    let capturedRequest: HttpRequest<unknown> | null = null;
    const request = new HttpRequest('GET', '/api/me');

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        authInterceptor(request, (nextRequest) => {
          capturedRequest = nextRequest;
          return of(new HttpResponse({ body: null }));
        }),
      ),
    );

    expect(capturedRequest!.headers.get('Authorization')).toBe('Bearer token-123');
  });
});
