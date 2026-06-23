import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { authGuard } from './auth-guard';
import { SessionPort } from '../../ports/session.port';

describe('authGuard', () => {
  const runGuard = () => TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SessionPort,
          useValue: {
            isAuthenticated: vi.fn(),
            getAccessToken: vi.fn(),
            clearSession: vi.fn(),
          },
        },
      ],
    });
  });

  it('allows navigation when authenticated', () => {
    const session = TestBed.inject(SessionPort);
    vi.mocked(session.isAuthenticated).mockReturnValue(true);

    expect(runGuard()).toBe(true);
  });

  it('redirects to login when not authenticated', () => {
    const session = TestBed.inject(SessionPort);
    const router = TestBed.inject(Router);
    vi.mocked(session.isAuthenticated).mockReturnValue(false);

    const result = runGuard();

    expect(result?.toString()).toBe(router.createUrlTree(['/login']).toString());
  });
});
