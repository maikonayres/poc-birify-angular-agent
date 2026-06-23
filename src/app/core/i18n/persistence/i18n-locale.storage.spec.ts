import { TestBed } from '@angular/core/testing';
import { I18nLocaleStorage } from './i18n-locale.storage';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

describe('I18nLocaleStorage', () => {
  let storage: I18nLocaleStorage;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [I18nLocaleStorage] });
    storage = TestBed.inject(I18nLocaleStorage);
  });

  it('saves and reads supported locale', () => {
    storage.save(LocaleEnum.EN_US);

    expect(storage.read()).toBe(LocaleEnum.EN_US);
  });

  it('returns null for unsupported locale', () => {
    localStorage.setItem('i18n_locale', 'fr-FR');

    expect(storage.read()).toBeNull();
  });

  it('clear removes stored locale', () => {
    storage.save(LocaleEnum.PT_BR);
    storage.clear();

    expect(storage.read()).toBeNull();
  });
});
