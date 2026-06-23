import { AuthMapper } from './auth.mapper';
import { AuthSessionApiResponseDto } from '../dtos/auth-session-api-response.dto';

describe('AuthMapper', () => {
  it('maps API response to session entity with display name from email', () => {
    const dto: AuthSessionApiResponseDto = {
      accessToken: 'token-abc',
      session: {
        id: 'user-1',
        email: 'john.doe@example.com',
        tenantId: 'tenant-1',
      },
    };

    const entity = AuthMapper.toSessionEntity(dto);

    expect(entity.accessToken).toBe('token-abc');
    expect(entity.session.id).toBe('user-1');
    expect(entity.session.email).toBe('john.doe@example.com');
    expect(entity.session.name).toBe('john.doe');
    expect(entity.session.tenantId).toBe('tenant-1');
    expect(entity.isAuthenticated()).toBe(true);
  });

  it('uses full email as display name when it has no @', () => {
    const dto: AuthSessionApiResponseDto = {
      accessToken: 'token',
      session: {
        id: 'user-2',
        email: 'localuser',
        tenantId: 'tenant-2',
      },
    };

    const entity = AuthMapper.toSessionEntity(dto);

    expect(entity.session.name).toBe('localuser');
  });
});
