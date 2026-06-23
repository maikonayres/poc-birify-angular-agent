import { LocaleEnum } from '../../../shared/enums/locale.enum';
import { LanguagesModel } from '../../../shared/models/i18n.model';

export type SupportedLocale = keyof LanguagesModel;

export interface SupportedLanguageDefinition {
  locale: SupportedLocale;
  flagCode: 'br' | 'us';
  flagTriggerCode?: string;
  flagObjectPosition: string;
}

export const SUPPORTED_LANGUAGES: readonly SupportedLanguageDefinition[] = [
  {
    locale: LocaleEnum.PT_BR,
    flagCode: 'br',
    flagTriggerCode: 'br-round',
    flagObjectPosition: 'center center',
  },
  { locale: LocaleEnum.EN_US, flagCode: 'us', flagObjectPosition: '25% center' },
] as const;

export function getFlagAssetPath(flagCode: string): string {
  return `assets/flags/${flagCode}.svg`;
}

export function getFlagTriggerAssetPath(language: SupportedLanguageDefinition): string {
  return getFlagAssetPath(language.flagTriggerCode ?? language.flagCode);
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LANGUAGES.some((language) => language.locale === locale);
}
