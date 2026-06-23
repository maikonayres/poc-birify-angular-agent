import { TestBed } from '@angular/core/testing';
import { I18nStore } from './i18n.store';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

describe('I18nStore', () => {
  let store: InstanceType<typeof I18nStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [I18nStore] });
    store = TestBed.inject(I18nStore);
  });

  it('updates current locale', () => {
    store.setCurrentLocale(LocaleEnum.EN_US);
    expect(store.currentLocale()).toBe(LocaleEnum.EN_US);
  });

  it('updates translations', () => {
    const translations = { global: { login: 'Login' } } as never;
    store.setTranslations(translations);
    expect(store.translations()).toEqual(translations);
  });

  it('updates default language and loaded flag', () => {
    store.setDefaultLanguage('pt-BR');
    store.setIsLoaded(true);

    expect(store.defaultLanguage()).toBe('pt-BR');
    expect(store.isLoaded()).toBe(true);
  });
});
