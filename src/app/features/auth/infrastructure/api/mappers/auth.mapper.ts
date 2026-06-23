import { AuthSessionApiResponseDto } from '../dtos/auth-session-api-response.dto';
import { AuthSessionEntity } from '../../../domain/entity/auth-session.entity';
import { AuthSessionPrincipalEntity } from '../../../domain/entity/auth-session-principal.entity';

export class AuthMapper {
  public static toSessionEntity(dto: AuthSessionApiResponseDto): AuthSessionEntity {
    const displayName = dto.session.email.includes('@')
      ? dto.session.email.slice(0, dto.session.email.indexOf('@'))
      : dto.session.email;

    return new AuthSessionEntity(
      dto.accessToken,
      new AuthSessionPrincipalEntity(
        dto.session.id,
        displayName,
        dto.session.email,
        null,
        dto.session.tenantId,
      ),
    );
  }
}
