import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LogoutUseCase } from './logout.use-case';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSessionPort } from '../../domain/ports/auth-session.port';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let repository: { logout: ReturnType<typeof vi.fn> };
  let sessionPort: { clearSession: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    repository = { logout: vi.fn() };
    sessionPort = { clearSession: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        LogoutUseCase,
        { provide: AuthRepository, useValue: repository },
        { provide: AuthSessionPort, useValue: sessionPort },
      ],
    });

    useCase = TestBed.inject(LogoutUseCase);
  });

  it('clears session after successful logout', () => {
    repository.logout.mockReturnValue(of(void 0));

    useCase.execute().subscribe();

    expect(repository.logout).toHaveBeenCalled();
    expect(sessionPort.clearSession).toHaveBeenCalled();
  });

  it('clears session even when logout request fails', () => {
    repository.logout.mockReturnValue(throwError(() => new Error('network')));

    useCase.execute().subscribe();

    expect(sessionPort.clearSession).toHaveBeenCalled();
  });
});
