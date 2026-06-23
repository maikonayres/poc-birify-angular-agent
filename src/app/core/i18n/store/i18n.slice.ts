import { SUPPORTED_LANGUAGES } from '../constants/supported-languages';
import { I18nStoreModel } from '../models/I18n-store.model';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

export const initialI18nSlice: I18nStoreModel = {
  isLoaded: false,
  error: null,
  defaultLanguage: '',
  currentLocale: LocaleEnum.PT_BR,
  languages: SUPPORTED_LANGUAGES.map((language) => language.locale),
  translations: null,
};
