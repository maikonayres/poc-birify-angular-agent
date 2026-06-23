import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type LoadingState = {
  globalPendingRequests: number;
  localPendingRequestsByScope: Record<string, number>;
};

const initialLoadingState: LoadingState = {
  globalPendingRequests: 0,
  localPendingRequestsByScope: {},
};

export const LoadingStore = signalStore(
  { providedIn: 'root' },
  withState(initialLoadingState),
  withComputed((store) => ({
    isGlobalLoading: computed(() => store.globalPendingRequests() > 0),
  })),
  withMethods((store) => ({
    incrementGlobal: () =>
      patchState(store, (state) => ({ globalPendingRequests: state.globalPendingRequests + 1 })),
    decrementGlobal: () =>
      patchState(store, (state) => ({
        globalPendingRequests: Math.max(0, state.globalPendingRequests - 1),
      })),
    incrementLocal: (scope: string) =>
      patchState(store, (state) => ({
        localPendingRequestsByScope: {
          ...state.localPendingRequestsByScope,
          [scope]: (state.localPendingRequestsByScope[scope] ?? 0) + 1,
        },
      })),
    decrementLocal: (scope: string) =>
      patchState(store, (state) => ({
        localPendingRequestsByScope: {
          ...state.localPendingRequestsByScope,
          [scope]: Math.max(0, (state.localPendingRequestsByScope[scope] ?? 0) - 1),
        },
      })),
    reset: () => patchState(store, { globalPendingRequests: 0, localPendingRequestsByScope: {} }),
  })),
);
