import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthFacade } from './auth.facade';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { AuthStore } from '../store/auth.store';
import { LoginErrorMapper } from '../services/login-error.mapper';

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let loginUseCase: { execute: ReturnType<typeof vi.fn> };
  let logoutUseCase: { execute: ReturnType<typeof vi.fn> };
  let loginErrorMapper: { map: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(() => {
    loginUseCase = { execute: vi.fn() };
    logoutUseCase = { execute: vi.fn() };
    loginErrorMapper = { map: vi.fn().mockReturnValue('Invalid credentials') };

    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        provideRouter([]),
        { provide: LoginUseCase, useValue: loginUseCase },
        { provide: LogoutUseCase, useValue: logoutUseCase },
        { provide: LoginErrorMapper, useValue: loginErrorMapper },
        {
          provide: AuthStore,
          useValue: { loading: signal(false) },
        },
      ],
    });

    facade = TestBed.inject(AuthFacade);
    router = TestBed.inject(Router);
  });

  it('navigates to home on successful login', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    loginUseCase.execute.mockReturnValue(of({}));

    facade.login('user@test.com', 'password');

    expect(loginUseCase.execute).toHaveBeenCalledWith('user@test.com', 'password');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(facade.loginErrorMessage()).toBeNull();
  });

  it('sets login error message on invalid credentials', () => {
    const error = new HttpErrorResponse({ status: 401 });
    loginUseCase.execute.mockReturnValue(throwError(() => error));

    facade.login('user@test.com', 'wrong');

    expect(loginErrorMapper.map).toHaveBeenCalledWith(error);
    expect(facade.loginErrorMessage()).toBe('Invalid credentials');
  });

  it('clearLoginError resets error signal', () => {
    loginUseCase.execute.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 })),
    );
    facade.login('user@test.com', 'wrong');
    facade.clearLoginError();

    expect(facade.loginErrorMessage()).toBeNull();
  });

  it('navigates to login after logout success', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    logoutUseCase.execute.mockReturnValue(of(void 0));

    facade.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('navigates to login after logout error', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    logoutUseCase.execute.mockReturnValue(throwError(() => new Error('fail')));

    facade.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
