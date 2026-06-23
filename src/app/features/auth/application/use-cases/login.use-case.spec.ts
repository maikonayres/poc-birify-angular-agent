import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoginUseCase } from './login.use-case';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSessionPort } from '../../domain/ports/auth-session.port';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../domain/entity/auth-session-principal.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let repository: { login: ReturnType<typeof vi.fn> };
  let sessionPort: {
    setLoading: ReturnType<typeof vi.fn>;
    setSession: ReturnType<typeof vi.fn>;
  };

  const session = new AuthSessionEntity(
    'token',
    new AuthSessionPrincipalEntity('1', 'User', 'user@test.com', null, 'tenant'),
  );

  beforeEach(() => {
    repository = { login: vi.fn() };
    sessionPort = { setLoading: vi.fn(), setSession: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: AuthRepository, useValue: repository },
        { provide: AuthSessionPort, useValue: sessionPort },
      ],
    });

    useCase = TestBed.inject(LoginUseCase);
  });

  it('sets loading, persists session and clears loading on success', () => {
    repository.login.mockReturnValue(of(session));

    useCase.execute('user@test.com', 'password').subscribe();

    expect(sessionPort.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(repository.login).toHaveBeenCalledWith('user@test.com', 'password');
    expect(sessionPort.setSession).toHaveBeenCalledWith(session);
    expect(sessionPort.setLoading).toHaveBeenLastCalledWith(false);
  });

  it('clears loading on error', () => {
    repository.login.mockReturnValue(throwError(() => new Error('fail')));

    useCase.execute('user@test.com', 'wrong').subscribe({ error: () => {} });

    expect(sessionPort.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(sessionPort.setSession).not.toHaveBeenCalled();
    expect(sessionPort.setLoading).toHaveBeenLastCalledWith(false);
  });
});
