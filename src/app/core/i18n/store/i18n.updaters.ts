import { PartialStateUpdater } from '@ngrx/signals';
import { I18nStoreModel } from '../models/I18n-store.model';
import { LocaleEnum } from '../../../shared/enums/locale.enum';
import { I18nModel } from '../../../shared/models/i18n.model';

export function setDefaultLanguage(value: string): PartialStateUpdater<I18nStoreModel> {
  return (state) => ({
    defaultLanguage: value,
  });
}

export function setTranslations(value: I18nModel): PartialStateUpdater<I18nStoreModel> {
  return (state) => ({
    translations: value,
  });
}

export function setCurrentLocale(value: LocaleEnum): PartialStateUpdater<I18nStoreModel> {
  return (state) => ({
    currentLocale: value,
  });
}

export function setIsLoaded(value: boolean): PartialStateUpdater<I18nStoreModel> {
  return (state) => ({
    isLoaded: value,
  });
}
