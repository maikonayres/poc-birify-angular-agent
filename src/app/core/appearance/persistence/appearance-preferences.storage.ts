import { Injectable } from '@angular/core';
import {
  AppearancePreferences,
  AppearanceStoreModel,
} from '../store/models/appearance-store.model';
import { appearanceSlice } from '../store/appearance.slice';

const VALID_PRESETS = new Set(['Aura', 'Lara', 'Nora']);
const VALID_MENU_MODES = new Set(['static', 'overlay']);

@Injectable({
  providedIn: 'root',
})
export class AppearancePreferencesStorage {
  private readonly _key = 'appearance_preferences';

  public save(preferences: AppearanceStoreModel): void {
    localStorage.setItem(this._key, JSON.stringify(preferences));
  }

  public read(): AppearancePreferences | null {
    const raw = localStorage.getItem(this._key);

    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AppearancePreferences>;

      if (
        !parsed.preset ||
        !VALID_PRESETS.has(parsed.preset) ||
        !parsed.primary ||
        typeof parsed.darkTheme !== 'boolean' ||
        !parsed.menuMode ||
        !VALID_MENU_MODES.has(parsed.menuMode)
      ) {
        this.clear();
        return null;
      }

      return {
        preset: parsed.preset,
        primary: parsed.primary,
        surface: parsed.surface ?? null,
        darkTheme: parsed.darkTheme,
        menuMode: parsed.menuMode,
      };
    } catch {
      this.clear();
      return null;
    }
  }

  public clear(): void {
    localStorage.removeItem(this._key);
  }

  public getDefaults(): AppearancePreferences {
    return { ...appearanceSlice };
  }
}
