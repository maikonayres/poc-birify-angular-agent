import { Observable } from 'rxjs';
import { AuthSessionEntity } from '../entity/auth-session.entity';

export abstract class AuthRepository {
  public abstract login(email: string, password: string): Observable<AuthSessionEntity>;
  public abstract logout(): Observable<void>;
  public abstract getCurrentUser(): Observable<AuthSessionEntity>;
}
