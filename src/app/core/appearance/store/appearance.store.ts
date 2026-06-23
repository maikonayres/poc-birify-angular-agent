import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { buildPrimaryColors } from '../constants/appearance-palettes';
import { AppearancePreferencesStorage } from '../persistence/appearance-preferences.storage';
import { appearanceSlice } from './appearance.slice';
import {
  setDarkTheme,
  setMenuMode,
  setPreferences,
  setPreset,
  setPrimary,
  setSurface,
  toggleDarkTheme,
} from './appearance.updaters';

export const AppearanceStore = signalStore(
  { providedIn: 'root' },
  withState(appearanceSlice),
  withComputed((store) => ({
    primaryColors: computed(() => buildPrimaryColors(store.preset())),
  })),
  withMethods((store, storage = inject(AppearancePreferencesStorage)) => {
    const persist = () =>
      storage.save({
        preset: store.preset(),
        primary: store.primary(),
        surface: store.surface(),
        darkTheme: store.darkTheme(),
        menuMode: store.menuMode(),
      });

    return {
      hydrate: (): void => {
        const preferences = storage.read() ?? storage.getDefaults();
        patchState(store, setPreferences(preferences));
      },
      setPreset: (value: string) => {
        patchState(store, setPreset(value));
        persist();
      },
      setPrimary: (value: string) => {
        patchState(store, setPrimary(value));
        persist();
      },
      setSurface: (value: string | null) => {
        patchState(store, setSurface(value));
        persist();
      },
      setDarkTheme: (value: boolean) => {
        patchState(store, setDarkTheme(value));
        persist();
      },
      toggleDarkTheme: () => {
        patchState(store, toggleDarkTheme());
        persist();
      },
      setMenuMode: (value: string) => {
        patchState(store, setMenuMode(value));
        persist();
      },
    };
  }),
);
