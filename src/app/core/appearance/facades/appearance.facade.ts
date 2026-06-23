import { computed, inject, Injectable } from '@angular/core';
import {
  APPEARANCE_PRESET_NAMES,
  APPEARANCE_SURFACES,
  AppearanceSurface,
  MENU_MODE_OPTIONS,
} from '../constants/appearance-palettes';
import { AppearanceService } from '../services/appearance.service';
import { AppearanceStore } from '../store/appearance.store';
import { AppearancePreferences } from '../store/models/appearance-store.model';

@Injectable({
  providedIn: 'root',
})
export class AppearanceFacade {
  private readonly _store = inject(AppearanceStore);
  private readonly _service = inject(AppearanceService);

  public readonly preset = this._store.preset;
  public readonly primary = this._store.primary;
  public readonly surface = this._store.surface;
  public readonly darkTheme = this._store.darkTheme;
  public readonly menuMode = this._store.menuMode;
  public readonly primaryColors = this._store.primaryColors;

  public readonly presets = APPEARANCE_PRESET_NAMES;
  public readonly surfaces = APPEARANCE_SURFACES;
  public readonly menuModeOptions = [...MENU_MODE_OPTIONS];

  public readonly isDarkTheme = computed(() => this._store.darkTheme());

  public hydrate(): void {
    this._store.hydrate();
  }

  public updatePrimary(color: AppearanceSurface): void {
    if (!color.name) {
      return;
    }

    this._store.setPrimary(color.name);
    this._service.applyPrimary(this.currentPreferences());
  }

  public updateSurface(color: AppearanceSurface): void {
    this._store.setSurface(color.name ?? null);
    this._service.applySurface(color);
  }

  public changePreset(preset: string): void {
    this._store.setPreset(preset);
    this._service.applyPresetTheme(this.currentPreferences());
  }

  public toggleDarkTheme(): void {
    this._store.toggleDarkTheme();
    this._service.applyDarkTheme(this._store.darkTheme(), true);
  }

  public changeMenuMode(menuMode: string): void {
    this._store.setMenuMode(menuMode);
  }

  private currentPreferences(): AppearancePreferences {
    return {
      preset: this._store.preset(),
      primary: this._store.primary(),
      surface: this._store.surface(),
      darkTheme: this._store.darkTheme(),
      menuMode: this._store.menuMode(),
    };
  }
}
