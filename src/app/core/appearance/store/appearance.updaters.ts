import { PartialStateUpdater } from '@ngrx/signals';
import { AppearancePreferences, AppearanceStoreModel } from './models/appearance-store.model';

export function setPreferences(
  value: AppearancePreferences,
): PartialStateUpdater<AppearanceStoreModel> {
  return () => ({ ...value });
}

export function setPreset(value: string): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, preset: value });
}

export function setPrimary(value: string): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, primary: value });
}

export function setSurface(value: string | null): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, surface: value });
}

export function setDarkTheme(value: boolean): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, darkTheme: value });
}

export function toggleDarkTheme(): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, darkTheme: !state.darkTheme });
}

export function setMenuMode(value: string): PartialStateUpdater<AppearanceStoreModel> {
  return (state) => ({ ...state, menuMode: value });
}
