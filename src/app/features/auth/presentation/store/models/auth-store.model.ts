import { AuthSessionEntity } from '../../../domain/entity/auth-session.entity';

export interface AuthStoreModel {
  session: AuthSessionEntity | null;
  loading: boolean;
}
