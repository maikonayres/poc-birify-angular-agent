import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { AuthStore } from '../store/auth.store';
import { LoginErrorMapper } from '../services/login-error.mapper';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly _loginUseCase = inject(LoginUseCase);
  private readonly _logoutUseCase = inject(LogoutUseCase);
  private readonly _router = inject(Router);
  private readonly _authStore = inject(AuthStore);
  private readonly _loginErrorMapper = inject(LoginErrorMapper);

  private readonly _loginError = signal<string | null>(null);

  public readonly loginErrorMessage = this._loginError.asReadonly();
  public readonly isLoggingIn = this._authStore.loading;

  public login(email: string, password: string): void {
    this.clearLoginError();

    this._loginUseCase.execute(email, password).pipe(
      tap(() => {
        this._router.navigate(['/home']);
      }),
      catchError((error: HttpErrorResponse) => {
        this._loginError.set(this._loginErrorMapper.map(error));
        return EMPTY;
      }),
    ).subscribe({
      next: () => {
        this.clearLoginError();
      },
    });
  }

  public clearLoginError(): void {
    this._loginError.set(null);
  }

  public logout(): void {
    this._logoutUseCase.execute().subscribe({
      next: () => {
        this._router.navigate(['/login']);
      },
      error: () => {
        this._router.navigate(['/login']);
      },
    });
  }
}
