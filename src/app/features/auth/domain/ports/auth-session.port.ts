import { SessionPort } from '../../../../core/ports/session.port';
import { AuthSessionEntity } from '../entity/auth-session.entity';

export abstract class AuthSessionPort extends SessionPort {
  public abstract hydrateSession(): void;
  public abstract setLoading(value: boolean): void;
  public abstract setSession(session: AuthSessionEntity): void;
}
