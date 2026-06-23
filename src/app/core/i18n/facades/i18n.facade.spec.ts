import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LocaleEnum } from '../../../shared/enums/locale.enum';
import { I18nFacade } from './i18n.facade';
import { I18nService } from '../services/i18n.service';
import { I18nLocaleStorage } from '../persistence/i18n-locale.storage';

describe('I18nFacade', () => {
  let facade: I18nFacade;
  let service: {
    currentLocale: ReturnType<typeof signal<LocaleEnum>>;
    translations: ReturnType<typeof signal<Record<string, unknown> | null>>;
    setCurrentLanguage: ReturnType<typeof vi.fn>;
  };
  let storage: {
    read: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    service = {
      currentLocale: signal(LocaleEnum.PT_BR),
      translations: signal({
        languages: {
          [LocaleEnum.PT_BR]: 'Português',
          [LocaleEnum.EN_US]: 'English',
        },
        global: { selectLanguage: 'Idioma' },
      }),
      setCurrentLanguage: vi.fn(),
    };
    storage = { read: vi.fn(), save: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        I18nFacade,
        { provide: I18nService, useValue: service },
        { provide: I18nLocaleStorage, useValue: storage },
      ],
    });

    facade = TestBed.inject(I18nFacade);
  });

  it('exposes available languages from translations', () => {
    const languages = facade.availableLanguages();

    expect(languages).toHaveLength(2);
    expect(languages[0].locale).toBe(LocaleEnum.PT_BR);
    expect(languages[0].label).toBe('Português');
  });

  it('hydrate applies saved locale when different', () => {
    storage.read.mockReturnValue(LocaleEnum.EN_US);

    facade.hydrate();

    expect(service.setCurrentLanguage).toHaveBeenCalledWith(LocaleEnum.EN_US);
  });

  it('hydrate does nothing when saved locale matches current', () => {
    storage.read.mockReturnValue(LocaleEnum.PT_BR);

    facade.hydrate();

    expect(service.setCurrentLanguage).not.toHaveBeenCalled();
  });

  it('changeLanguage no-ops when locale is unchanged', () => {
    facade.changeLanguage(LocaleEnum.PT_BR);

    expect(service.setCurrentLanguage).not.toHaveBeenCalled();
    expect(storage.save).not.toHaveBeenCalled();
  });

  it('changeLanguage updates service and persists locale', () => {
    facade.changeLanguage(LocaleEnum.EN_US);

    expect(service.setCurrentLanguage).toHaveBeenCalledWith(LocaleEnum.EN_US);
    expect(storage.save).toHaveBeenCalledWith(LocaleEnum.EN_US);
  });

  it('exposes current language for active locale', () => {
    expect(facade.currentLanguage()?.locale).toBe(LocaleEnum.PT_BR);
    expect(facade.currentLanguage()?.label).toBe('Português');
  });

  it('falls back to first language when locale is unknown', () => {
    service.currentLocale = signal('unknown' as LocaleEnum);

    expect(facade.currentLanguage()?.locale).toBe(LocaleEnum.PT_BR);
  });

  it('exposes select language label from translations', () => {
    expect(facade.selectLanguageLabel()).toBe('Idioma');
  });
});
