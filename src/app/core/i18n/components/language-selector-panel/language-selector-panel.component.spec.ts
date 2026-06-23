import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LanguageSelectorPanel } from './language-selector-panel.component';
import { I18nFacade } from '../../facades/i18n.facade';
import { LocaleEnum } from '../../../../shared/enums/locale.enum';

describe('LanguageSelectorPanel', () => {
  let fixture: ComponentFixture<LanguageSelectorPanel>;
  let component: LanguageSelectorPanel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorPanel],
      providers: [
        {
          provide: I18nFacade,
          useValue: {
            availableLanguages: signal([
              {
                locale: LocaleEnum.PT_BR,
                label: 'Português',
                flagSrc: 'assets/flags/br.svg',
                flagTriggerSrc: 'assets/flags/br-round.svg',
                flagAlt: 'Português',
                flagObjectPosition: 'center',
              },
            ]),
            currentLocale: signal(LocaleEnum.PT_BR),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits languageSelected when a language is chosen', () => {
    const emitSpy = vi.spyOn(component.languageSelected, 'emit');

    component['selectLanguage'](LocaleEnum.PT_BR);

    expect(emitSpy).toHaveBeenCalledWith(LocaleEnum.PT_BR);
  });
});
