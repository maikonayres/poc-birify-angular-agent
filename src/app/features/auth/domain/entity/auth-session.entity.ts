import { AuthSessionPrincipalEntity } from './auth-session-principal.entity';

export class AuthSessionEntity {
  public constructor(
    public readonly accessToken: string,
    public readonly session: AuthSessionPrincipalEntity,
  ) {}

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}
