import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import { AppearanceStore } from '../store/appearance.store';
import {
  APPEARANCE_PRESETS,
  APPEARANCE_SURFACES,
  AppearancePalette,
  AppearancePresetName,
  AppearanceSurface,
  buildPrimaryColors,
} from '../constants/appearance-palettes';
import { AppearancePreferences } from '../store/models/appearance-store.model';

@Injectable({
  providedIn: 'root',
})
export class AppearanceService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _store = inject(AppearanceStore);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this._platformId)) {
        return;
      }

      this.applyFullTheme(this.readPreferencesFromStore());
    });
  }

  public applyFullTheme(preferences: AppearancePreferences): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    this.applyDarkTheme(preferences.darkTheme, false);
    this.applyPresetTheme(preferences);
  }

  private readPreferencesFromStore(): AppearancePreferences {
    return {
      preset: this._store.preset(),
      primary: this._store.primary(),
      surface: this._store.surface(),
      darkTheme: this._store.darkTheme(),
      menuMode: this._store.menuMode(),
    };
  }

  public applyPrimary(preferences: AppearancePreferences): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    updatePreset(this.buildPresetExtension(preferences) as Parameters<typeof updatePreset>[0]);
  }

  public applySurface(surface: AppearanceSurface): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    updateSurfacePalette(surface.palette);
  }

  public applyPresetTheme(preferences: AppearancePreferences): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    const preset = APPEARANCE_PRESETS[preferences.preset as AppearancePresetName];
    const surfacePalette = APPEARANCE_SURFACES.find(
      (item) => item.name === preferences.surface,
    )?.palette;

    $t()
      .preset(preset)
      .preset(this.buildPresetExtension(preferences) as Parameters<typeof updatePreset>[0])
      .surfacePalette(surfacePalette)
      .use({ useDefaultOptions: true });
  }

  public applyDarkTheme(darkTheme: boolean, withTransition = true): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    if (withTransition && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        this.setDarkThemeClass(darkTheme);
      });
      return;
    }

    this.setDarkThemeClass(darkTheme);
  }

  private setDarkThemeClass(darkTheme: boolean): void {
    if (darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  private buildPresetExtension(preferences: AppearancePreferences): object {
    const primaryColors = buildPrimaryColors(preferences.preset);
    const color =
      primaryColors.find((item) => item.name === preferences.primary) ?? ({} as AppearanceSurface);
    const preset = preferences.preset;

    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}',
              },
            },
          },
        },
      };
    }

    if (preset === 'Nora') {
      return {
        semantic: {
          primary: color.palette,
          colorScheme: {
            light: {
              primary: {
                color: '{primary.600}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.700}',
                activeColor: '{primary.800}',
              },
              highlight: {
                background: '{primary.600}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.500}',
                contrastColor: '{surface.900}',
                hoverColor: '{primary.400}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.500}',
                focusBackground: '{primary.400}',
                color: '{surface.900}',
                focusColor: '{surface.900}',
              },
            },
          },
        },
      };
    }

    return {
      semantic: {
        primary: color.palette as AppearancePalette,
        colorScheme: {
          light: {
            primary: {
              color: '{primary.500}',
              contrastColor: '#ffffff',
              hoverColor: '{primary.600}',
              activeColor: '{primary.700}',
            },
            highlight: {
              background: '{primary.50}',
              focusBackground: '{primary.100}',
              color: '{primary.700}',
              focusColor: '{primary.800}',
            },
          },
          dark: {
            primary: {
              color: '{primary.400}',
              contrastColor: '{surface.900}',
              hoverColor: '{primary.300}',
              activeColor: '{primary.200}',
            },
            highlight: {
              background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
              focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
              color: 'rgba(255,255,255,.87)',
              focusColor: 'rgba(255,255,255,.87)',
            },
          },
        },
      },
    };
  }
}
