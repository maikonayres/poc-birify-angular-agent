import { setLoading, setSession } from './auth.updaters';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../domain/entity/auth-session-principal.entity';

describe('auth updaters', () => {
  const session = new AuthSessionEntity(
    'token',
    new AuthSessionPrincipalEntity('1', 'User', 'user@test.com', null, 'tenant'),
  );

  it('setLoading updates loading flag', () => {
    expect(setLoading(true)({} as never)).toEqual({ loading: true });
    expect(setLoading(false)({} as never)).toEqual({ loading: false });
  });

  it('setSession updates session', () => {
    expect(setSession(session)({} as never)).toEqual({ session });
    expect(setSession(null)({} as never)).toEqual({ session: null });
  });
});
