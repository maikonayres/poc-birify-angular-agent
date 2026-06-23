export abstract class SessionPort {
  public abstract isAuthenticated(): boolean;
  public abstract getAccessToken(): string | null;
  public abstract clearSession(): void;
}
