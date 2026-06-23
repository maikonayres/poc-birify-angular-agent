import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { authSlice } from './auth.slice';
import { setLoading, setSession } from './auth.updaters';
import { AuthSessionEntity } from '../../domain/entity/auth-session.entity';
import { AuthSessionStorage } from '../../infrastructure/api/persistence/auth-session.storage';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(authSlice),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.session()?.isAuthenticated()),
  })),
  withMethods((store, authSessionStorage = inject(AuthSessionStorage)) => ({
    hydrateSession: () => {
      const session = authSessionStorage.read();
      patchState(store, setSession(session));
    },
    setLoading: (value: boolean) => patchState(store, setLoading(value)),
    setSession: (value: AuthSessionEntity) => {
      authSessionStorage.save(value);
      patchState(store, setSession(value));
    },
    clearSession: () => {
      authSessionStorage.clear();
      patchState(store, setSession(null));
    },
  })),
);
