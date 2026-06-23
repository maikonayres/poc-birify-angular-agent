import { Injectable } from '@angular/core';
import { AuthSessionEntity } from '../../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../../domain/entity/auth-session-principal.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionStorage {
  private readonly _key = 'auth_session';

  public save(session: AuthSessionEntity): void {
    localStorage.setItem(this._key, JSON.stringify(session));
  }

  public read(): AuthSessionEntity | null {
    const raw = localStorage.getItem(this._key);

    if (!raw) {
      return null;
    }

    try {
      type StoredProfile = {
        id: string;
        name?: string;
        email: string;
        lastName?: string | null;
        clientKey?: string;
        tenantId?: string;
      };

      const parsed = JSON.parse(raw) as {
        accessToken: string;
        session?: StoredProfile;
        user?: StoredProfile;
      };

      const profile = parsed.session ?? parsed.user;
      const tenantId = profile?.tenantId ?? profile?.clientKey;
      if (!parsed.accessToken || !profile?.id || !tenantId) {
        this.clear();
        return null;
      }

      return new AuthSessionEntity(
        parsed.accessToken,
        new AuthSessionPrincipalEntity(
          profile.id,
          profile.name ?? '',
          profile.email,
          profile.lastName ?? null,
          tenantId,
        ),
      );
    } catch {
      this.clear();
      return null;
    }
  }

  public clear(): void {
    localStorage.removeItem(this._key);
  }
}
