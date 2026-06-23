import { inject, Injectable } from '@angular/core';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { finalize, Observable, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSessionPort } from '../../domain/ports/auth-session.port';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private readonly _authRepository = inject(AuthRepository);
  private readonly _authSessionPort = inject(AuthSessionPort);

  public execute(email: string, password: string): Observable<AuthSessionEntity> {
    this._authSessionPort.setLoading(true);

    return this._authRepository.login(email, password).pipe(
      tap((session) => {
        this._authSessionPort.setSession(session);
      }),
      finalize(() => {
        this._authSessionPort.setLoading(false);
      }),
    );
  }
}
