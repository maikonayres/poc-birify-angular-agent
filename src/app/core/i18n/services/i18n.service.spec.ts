import { TestBed } from '@angular/core/testing';
import { I18nStore } from '../store/i18n.store';
import { I18nService } from './i18n.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateMock } from '../../../shared/helpers/test-helpers';
import { TranslateService } from '@ngx-translate/core';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

describe('I18nService', () => {
  let service: I18nService;
  let translate: ReturnType<typeof provideTranslateMock>['useValue'];
  let store: InstanceType<typeof I18nStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateMock(),
        I18nService,
        I18nStore,
      ],
    });
    service = TestBed.inject(I18nService);
    translate = TestBed.inject(TranslateService) as never;
    store = TestBed.inject(I18nStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updates store when fallback language is loaded', () => {
    translate.onFallbackLangChange.next({
      lang: LocaleEnum.PT_BR,
      translations: { global: { login: 'Entrar' } },
    });

    expect(store.currentLocale()).toBe(LocaleEnum.PT_BR);
    expect(store.translations()).toEqual({ global: { login: 'Entrar' } });
    expect(document.documentElement.lang).toBe(LocaleEnum.PT_BR);
  });

  it('updates store when language changes', () => {
    translate.onLangChange.next({
      lang: LocaleEnum.EN_US,
      translations: { global: { login: 'Login' } },
    });

    expect(store.currentLocale()).toBe(LocaleEnum.EN_US);
    expect(store.translations()).toEqual({ global: { login: 'Login' } });
  });

  it('setCurrentLanguage delegates to translate service', () => {
    service.setCurrentLanguage(LocaleEnum.EN_US);

    expect(translate.use).toHaveBeenCalledWith(LocaleEnum.EN_US);
  });

  it('init exposes completion observable', () => {
    let completed = false;
    service.init().subscribe((value) => {
      completed = value;
    });

    translate.onFallbackLangChange.next({
      lang: LocaleEnum.PT_BR,
      translations: {},
    });

    expect(completed).toBe(true);
  });
});
