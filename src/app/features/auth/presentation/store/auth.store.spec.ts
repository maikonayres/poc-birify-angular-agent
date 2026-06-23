import { TestBed } from '@angular/core/testing';
import { AuthStore } from './auth.store';
import { AuthSessionStorage } from '../../infrastructure/api/persistence/auth-session.storage';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../domain/entity/auth-session-principal.entity';

describe('AuthStore', () => {
  let store: InstanceType<typeof AuthStore>;
  let storage: AuthSessionStorage;

  const session = new AuthSessionEntity(
    'token-123',
    new AuthSessionPrincipalEntity('1', 'User', 'user@test.com', null, 'tenant-1'),
  );

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [AuthStore, AuthSessionStorage],
    });

    store = TestBed.inject(AuthStore);
    storage = TestBed.inject(AuthSessionStorage);
  });

  it('starts unauthenticated', () => {
    expect(store.isAuthenticated()).toBe(false);
    expect(store.session()).toBeNull();
  });

  it('hydrates session from storage', () => {
    storage.save(session);

    store.hydrateSession();

    expect(store.session()?.accessToken).toBe('token-123');
    expect(store.isAuthenticated()).toBe(true);
  });

  it('setSession persists and updates state', () => {
    store.setSession(session);

    expect(store.session()).toEqual(session);
    expect(store.isAuthenticated()).toBe(true);
    expect(storage.read()?.accessToken).toBe('token-123');
  });

  it('clearSession removes persisted session', () => {
    store.setSession(session);
    store.clearSession();

    expect(store.session()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
    expect(storage.read()).toBeNull();
  });

  it('setLoading updates loading flag', () => {
    store.setLoading(true);
    expect(store.loading()).toBe(true);
    store.setLoading(false);
    expect(store.loading()).toBe(false);
  });
});
