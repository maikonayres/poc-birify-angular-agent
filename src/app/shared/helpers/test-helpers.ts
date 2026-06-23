import { signal, WritableSignal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { I18nModel } from '../models/i18n.model';
import { I18nService } from '../../core/i18n/services/i18n.service';
import { I18nFacade } from '../../core/i18n/facades/i18n.facade';
import { AppearanceFacade } from '../../core/appearance/facades/appearance.facade';
import { LocaleEnum } from '../enums/locale.enum';

export function provideI18nMock(
  translations: Partial<I18nModel> | null = null,
) {
  const translationsSignal = signal<Partial<I18nModel> | null>(translations);

  return {
    provide: I18nService,
    useValue: {
      translations: translationsSignal,
      currentLocale: signal(LocaleEnum.PT_BR),
      setCurrentLanguage: vi.fn(),
      init: vi.fn(),
    },
  };
}

export function provideTranslateMock(): {
  provide: typeof TranslateService;
  useValue: {
    onFallbackLangChange: Subject<{ lang: string; translations: unknown }>;
    onLangChange: Subject<{ lang: string; translations: unknown }>;
    use: ReturnType<typeof vi.fn>;
    getFallbackLang: ReturnType<typeof vi.fn>;
  };
} {
  return {
    provide: TranslateService,
    useValue: {
      onFallbackLangChange: new Subject(),
      onLangChange: new Subject(),
      use: vi.fn().mockReturnValue(new Subject()),
      getFallbackLang: vi.fn().mockReturnValue(LocaleEnum.PT_BR),
    },
  };
}

export function provideI18nFacadeMock(): {
  provide: typeof I18nFacade;
  useValue: {
    availableLanguages: ReturnType<typeof signal<unknown[]>>;
    currentLocale: ReturnType<typeof signal<LocaleEnum>>;
    currentLanguage: ReturnType<typeof signal<unknown>>;
    selectLanguageLabel: ReturnType<typeof signal<string>>;
    changeLanguage: ReturnType<typeof vi.fn>;
    hydrate: ReturnType<typeof vi.fn>;
    translations: ReturnType<typeof signal<null>>;
  };
} {
  return {
    provide: I18nFacade,
    useValue: {
      availableLanguages: signal([]),
      currentLocale: signal(LocaleEnum.PT_BR),
      currentLanguage: signal({
        locale: LocaleEnum.PT_BR,
        label: 'Português',
        flagSrc: 'assets/flags/br.svg',
        flagTriggerSrc: 'assets/flags/br-round.svg',
        flagAlt: 'Português',
        flagObjectPosition: 'center center',
      }),
      selectLanguageLabel: signal('Idioma'),
      changeLanguage: vi.fn(),
      hydrate: vi.fn(),
      translations: signal(null),
    },
  };
}

export function provideAppearanceFacadeMock() {
  return {
    provide: AppearanceFacade,
    useValue: {
      preset: signal('Aura'),
      primary: signal('emerald'),
      surface: signal(null),
      darkTheme: signal(false),
      menuMode: signal('static'),
      primaryColors: signal([]),
      presets: [],
      surfaces: [],
      menuModeOptions: [],
      isDarkTheme: signal(false),
      toggleDarkTheme: vi.fn(),
      updatePrimary: vi.fn(),
      updateSurface: vi.fn(),
      changePreset: vi.fn(),
      changeMenuMode: vi.fn(),
      hydrate: vi.fn(),
    },
  };
}

export function getTestProviders(extra: Array<Provider | EnvironmentProviders> = []): Array<
  Provider | EnvironmentProviders
> {
  return [
    provideHttpClient(),
    provideHttpClientTesting(),
    provideRouter([]),
    provideTranslateMock(),
    provideI18nMock(),
    ...extra,
  ];
}
