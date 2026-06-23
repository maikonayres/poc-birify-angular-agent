import {
  setCurrentLocale,
  setDefaultLanguage,
  setIsLoaded,
  setTranslations,
} from './i18n.updaters';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

describe('i18n updaters', () => {
  it('setDefaultLanguage updates defaultLanguage', () => {
    expect(setDefaultLanguage('pt-BR')({} as never)).toEqual({ defaultLanguage: 'pt-BR' });
  });

  it('setTranslations updates translations', () => {
    const translations = { global: { login: 'Entrar' } } as never;
    expect(setTranslations(translations)({} as never)).toEqual({ translations });
  });

  it('setCurrentLocale updates currentLocale', () => {
    expect(setCurrentLocale(LocaleEnum.PT_BR)({} as never)).toEqual({
      currentLocale: LocaleEnum.PT_BR,
    });
  });

  it('setIsLoaded updates isLoaded', () => {
    expect(setIsLoaded(true)({} as never)).toEqual({ isLoaded: true });
  });
});
