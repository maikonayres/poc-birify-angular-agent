import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuthSessionAdapter } from './auth-session.adapter';
import { AuthStore } from '../store/auth.store';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../domain/entity/auth-session-principal.entity';

describe('AuthSessionAdapter', () => {
  let adapter: AuthSessionAdapter;
  let storeMock: {
    hydrateSession: ReturnType<typeof vi.fn>;
    setLoading: ReturnType<typeof vi.fn>;
    setSession: ReturnType<typeof vi.fn>;
    clearSession: ReturnType<typeof vi.fn>;
    isAuthenticated: ReturnType<typeof vi.fn>;
    session: ReturnType<typeof signal<AuthSessionEntity | null>>;
  };

  const session = new AuthSessionEntity(
    'token',
    new AuthSessionPrincipalEntity('1', 'User', 'user@test.com', null, 'tenant'),
  );

  beforeEach(() => {
    storeMock = {
      hydrateSession: vi.fn(),
      setLoading: vi.fn(),
      setSession: vi.fn(),
      clearSession: vi.fn(),
      isAuthenticated: vi.fn().mockReturnValue(true),
      session: signal(session),
    };

    TestBed.configureTestingModule({
      providers: [AuthSessionAdapter, { provide: AuthStore, useValue: storeMock }],
    });

    adapter = TestBed.inject(AuthSessionAdapter);
  });

  it('delegates hydrateSession to store', () => {
    adapter.hydrateSession();
    expect(storeMock.hydrateSession).toHaveBeenCalled();
  });

  it('delegates setLoading to store', () => {
    adapter.setLoading(true);
    expect(storeMock.setLoading).toHaveBeenCalledWith(true);
  });

  it('delegates setSession to store', () => {
    adapter.setSession(session);
    expect(storeMock.setSession).toHaveBeenCalledWith(session);
  });

  it('delegates clearSession to store', () => {
    adapter.clearSession();
    expect(storeMock.clearSession).toHaveBeenCalled();
  });

  it('delegates isAuthenticated to store', () => {
    expect(adapter.isAuthenticated()).toBe(true);
  });

  it('returns access token from store session', () => {
    expect(adapter.getAccessToken()).toBe('token');
  });

  it('returns null when session is missing', () => {
    storeMock.session = signal(null);
    expect(adapter.getAccessToken()).toBeNull();
  });
});
