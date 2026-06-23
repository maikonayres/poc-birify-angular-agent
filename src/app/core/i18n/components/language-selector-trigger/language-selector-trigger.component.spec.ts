import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideI18nFacadeMock } from '../../../../shared/helpers/test-helpers';
import { LanguageSelectorTrigger } from './language-selector-trigger.component';
import { I18nFacade } from '../../facades/i18n.facade';
import { LocaleEnum } from '../../../../shared/enums/locale.enum';

describe('LanguageSelectorTrigger', () => {
  let fixture: ComponentFixture<LanguageSelectorTrigger>;
  let component: LanguageSelectorTrigger;
  let i18nFacade: { changeLanguage: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorTrigger],
      providers: [provideI18nFacadeMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorTrigger);
    component = fixture.componentInstance;
    i18nFacade = TestBed.inject(I18nFacade) as never;
    fixture.detectChanges();
  });

  it('opens panel after interactions are enabled', () => {
    component['interactionsEnabled'] = true;
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    component['toggle'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component['isOpen']()).toBe(true);
  });

  it('changes language and closes panel on selection', () => {
    component['isOpen'].set(true);

    component['onLanguageSelected'](LocaleEnum.EN_US);

    expect(i18nFacade.changeLanguage).toHaveBeenCalledWith(LocaleEnum.EN_US);
    expect(component['isOpen']()).toBe(false);
  });

  it('closes panel on escape', () => {
    component['isOpen'].set(true);

    component['onEscape']();

    expect(component['isOpen']()).toBe(false);
  });

  it('closes panel on outside document click', () => {
    component['isOpen'].set(true);

    component['onDocumentClick'](new MouseEvent('click'));

    expect(component['isOpen']()).toBe(false);
  });
});
