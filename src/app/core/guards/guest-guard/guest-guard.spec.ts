import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { guestGuard } from './guest-guard';
import { SessionPort } from '../../ports/session.port';

describe('guestGuard', () => {
  const runGuard = () => TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never));

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

  it('allows navigation when not authenticated', () => {
    const session = TestBed.inject(SessionPort);
    vi.mocked(session.isAuthenticated).mockReturnValue(false);

    expect(runGuard()).toBe(true);
  });

  it('redirects to home when authenticated', () => {
    const session = TestBed.inject(SessionPort);
    const router = TestBed.inject(Router);
    vi.mocked(session.isAuthenticated).mockReturnValue(true);

    const result = runGuard();

    expect(result?.toString()).toBe(router.createUrlTree(['/home']).toString());
  });
});
