import { TestBed } from '@angular/core/testing';
import { AuthSessionStorage } from './auth-session.storage';
import { AuthSessionEntity } from '../../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../../domain/entity/auth-session-principal.entity';

describe('AuthSessionStorage', () => {
  let storage: AuthSessionStorage;

  const session = new AuthSessionEntity(
    'token-abc',
    new AuthSessionPrincipalEntity('user-1', 'John', 'john@test.com', null, 'tenant-1'),
  );

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [AuthSessionStorage] });
    storage = TestBed.inject(AuthSessionStorage);
  });

  it('saves and reads session round-trip', () => {
    storage.save(session);

    const restored = storage.read();

    expect(restored?.accessToken).toBe('token-abc');
    expect(restored?.session.email).toBe('john@test.com');
    expect(restored?.session.tenantId).toBe('tenant-1');
  });

  it('reads legacy user shape', () => {
    localStorage.setItem(
      'auth_session',
      JSON.stringify({
        accessToken: 'legacy-token',
        user: {
          id: 'legacy-1',
          name: 'Legacy',
          email: 'legacy@test.com',
          clientKey: 'client-key',
        },
      }),
    );

    const restored = storage.read();

    expect(restored?.accessToken).toBe('legacy-token');
    expect(restored?.session.tenantId).toBe('client-key');
  });

  it('clears invalid data and returns null', () => {
    localStorage.setItem('auth_session', '{ invalid json');

    expect(storage.read()).toBeNull();
    expect(localStorage.getItem('auth_session')).toBeNull();
  });

  it('clears incomplete data', () => {
    localStorage.setItem('auth_session', JSON.stringify({ accessToken: 'only-token' }));

    expect(storage.read()).toBeNull();
    expect(localStorage.getItem('auth_session')).toBeNull();
  });

  it('clear removes stored session', () => {
    storage.save(session);
    storage.clear();

    expect(storage.read()).toBeNull();
  });
});
