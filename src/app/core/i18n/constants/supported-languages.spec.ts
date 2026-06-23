import { LocaleEnum } from '../../../shared/enums/locale.enum';
import {
  getFlagAssetPath,
  getFlagTriggerAssetPath,
  isSupportedLocale,
  SUPPORTED_LANGUAGES,
} from './supported-languages';

describe('supported-languages', () => {
  it('isSupportedLocale returns true for supported locales', () => {
    expect(isSupportedLocale(LocaleEnum.PT_BR)).toBe(true);
    expect(isSupportedLocale(LocaleEnum.EN_US)).toBe(true);
  });

  it('isSupportedLocale returns false for unsupported locales', () => {
    expect(isSupportedLocale('fr-FR')).toBe(false);
    expect(isSupportedLocale('')).toBe(false);
  });

  it('getFlagAssetPath builds asset path', () => {
    expect(getFlagAssetPath('br')).toBe('assets/flags/br.svg');
  });

  it('getFlagTriggerAssetPath prefers flagTriggerCode', () => {
    const ptBr = SUPPORTED_LANGUAGES.find((l) => l.locale === LocaleEnum.PT_BR)!;
    expect(getFlagTriggerAssetPath(ptBr)).toBe('assets/flags/br-round.svg');
  });

  it('getFlagTriggerAssetPath falls back to flagCode', () => {
    const enUs = SUPPORTED_LANGUAGES.find((l) => l.locale === LocaleEnum.EN_US)!;
    expect(getFlagTriggerAssetPath(enUs)).toBe('assets/flags/us.svg');
  });
});
