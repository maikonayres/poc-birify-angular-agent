import { inject, Injectable } from '@angular/core';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionPort } from '../../domain/ports/auth-session.port';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class AuthSessionAdapter extends AuthSessionPort {
  private readonly _authStore = inject(AuthStore);

  public hydrateSession(): void {
    this._authStore.hydrateSession();
  }

  public setLoading(value: boolean): void {
    this._authStore.setLoading(value);
  }

  public setSession(session: AuthSessionEntity): void {
    this._authStore.setSession(session);
  }

  public clearSession(): void {
    this._authStore.clearSession();
  }

  public isAuthenticated(): boolean {
    return this._authStore.isAuthenticated();
  }

  public getAccessToken(): string | null {
    return this._authStore.session()?.accessToken ?? null;
  }
}
