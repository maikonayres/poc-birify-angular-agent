import { PartialStateUpdater } from '@ngrx/signals';
import { AuthStoreModel } from './models/auth-store.model';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';

export function setLoading(value: boolean): PartialStateUpdater<AuthStoreModel> {
  return () => ({
    loading: value,
  });
}

export function setSession(value: AuthSessionEntity | null): PartialStateUpdater<AuthStoreModel> {
  return () => ({
    session: value,
  });
}
