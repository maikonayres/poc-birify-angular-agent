import { TestBed } from '@angular/core/testing';
import { HttpContext, HttpErrorResponse, HttpRequest, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { firstValueFrom, throwError } from 'rxjs';
import { errorInterceptor, SKIP_SESSION_EXPIRED_HANDLING } from './error-interceptor';
import { SessionPort } from '../../ports/session.port';

describe('errorInterceptor', () => {
  const runInterceptor = (req: HttpRequest<unknown>, error: HttpErrorResponse) =>
    TestBed.runInInjectionContext(() =>
      errorInterceptor(req, () => throwError(() => error)),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: SessionPort,
          useValue: {
            clearSession: vi.fn(),
            isAuthenticated: vi.fn(),
            getAccessToken: vi.fn(),
          },
        },
      ],
    });
  });

  it('clears session and redirects on 401', async () => {
    const session = TestBed.inject(SessionPort);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const request = new HttpRequest('GET', '/api/me');
    const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });

    await expect(firstValueFrom(runInterceptor(request, error))).rejects.toBe(error);

    expect(session.clearSession).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('skips session handling when context flag is set', async () => {
    const session = TestBed.inject(SessionPort);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const context = new HttpContext().set(SKIP_SESSION_EXPIRED_HANDLING, true);
    const request = new HttpRequest('POST', '/auth/login', null, { context });
    const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });

    await expect(firstValueFrom(runInterceptor(request, error))).rejects.toBe(error);

    expect(session.clearSession).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
