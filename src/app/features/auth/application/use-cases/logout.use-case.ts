import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSessionPort } from '../../domain/ports/auth-session.port';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  private readonly _authRepository = inject(AuthRepository);
  private readonly _authSessionPort = inject(AuthSessionPort);

  public execute(): Observable<void> {
    return this._authRepository.logout().pipe(
      catchError(() => of(void 0)),
      tap(() => this._authSessionPort.clearSession()),
    );
  }
}
