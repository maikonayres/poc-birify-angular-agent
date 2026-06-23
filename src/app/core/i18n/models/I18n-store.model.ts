import { LocaleEnum } from '../../../shared/enums/locale.enum';
import { I18nModel } from '../../../shared/models/i18n.model';

export interface I18nStoreModel {
  isLoaded: boolean;
  error: string | null;
  languages: string[];
  defaultLanguage: string;
  currentLocale: LocaleEnum;
  translations: I18nModel | null;
}
