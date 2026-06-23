import { computed, inject, Injectable } from '@angular/core';
import { LocaleEnum } from '../../../shared/enums/locale.enum';
import {
  getFlagAssetPath,
  getFlagTriggerAssetPath,
  SUPPORTED_LANGUAGES,
  SupportedLocale,
} from '../constants/supported-languages';
import { I18nLocaleStorage } from '../persistence/i18n-locale.storage';
import { I18nService } from '../services/i18n.service';

export interface LanguageOption {
  locale: SupportedLocale;
  label: string;
  flagSrc: string;
  flagTriggerSrc: string;
  flagAlt: string;
  flagObjectPosition: string;
}

@Injectable({
  providedIn: 'root',
})
export class I18nFacade {
  private readonly _service = inject(I18nService);
  private readonly _storage = inject(I18nLocaleStorage);

  public readonly currentLocale = this._service.currentLocale;
  public readonly translations = this._service.translations;

  public readonly availableLanguages = computed<LanguageOption[]>(() => {
    const languageLabels = this._service.translations()?.languages;

    return SUPPORTED_LANGUAGES.map((language) => ({
      locale: language.locale,
      label: languageLabels?.[language.locale] ?? language.locale,
      flagSrc: getFlagAssetPath(language.flagCode),
      flagTriggerSrc: getFlagTriggerAssetPath(language),
      flagAlt: languageLabels?.[language.locale] ?? language.locale,
      flagObjectPosition: language.flagObjectPosition,
    }));
  });

  public readonly currentLanguage = computed(() => {
    const locale = this._service.currentLocale();
    return (
      this.availableLanguages().find((language) => language.locale === locale) ??
      this.availableLanguages()[0]
    );
  });

  public readonly selectLanguageLabel = computed(
    () => this._service.translations()?.global?.selectLanguage ?? 'Select language',
  );

  public hydrate(): void {
    const savedLocale = this._storage.read();

    if (savedLocale && savedLocale !== this._service.currentLocale()) {
      this._service.setCurrentLanguage(savedLocale);
    }
  }

  public changeLanguage(locale: SupportedLocale): void {
    if (locale === this._service.currentLocale()) {
      return;
    }

    this._service.setCurrentLanguage(locale);
    this._storage.save(locale as LocaleEnum);
  }
}
