import { Injectable } from '@angular/core';
import { LocaleEnum } from '../../../shared/enums/locale.enum';
import { isSupportedLocale, SUPPORTED_LANGUAGES } from '../constants/supported-languages';

const STORAGE_KEY = 'i18n_locale';

@Injectable({
  providedIn: 'root',
})
export class I18nLocaleStorage {
  public save(locale: LocaleEnum): void {
    localStorage.setItem(STORAGE_KEY, locale);
  }

  public read(): LocaleEnum | null {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw || !isSupportedLocale(raw)) {
      return null;
    }

    return raw as LocaleEnum;
  }

  public clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
