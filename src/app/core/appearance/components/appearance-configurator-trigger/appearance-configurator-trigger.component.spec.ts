import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppearanceFacadeMock } from '../../../../shared/helpers/test-helpers';
import { AppearanceConfiguratorTrigger } from './appearance-configurator-trigger.component';

describe('AppearanceConfiguratorTrigger', () => {
  let fixture: ComponentFixture<AppearanceConfiguratorTrigger>;
  let component: AppearanceConfiguratorTrigger;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppearanceConfiguratorTrigger],
      providers: [provideAppearanceFacadeMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppearanceConfiguratorTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toggles panel when interactions are enabled', () => {
    component['interactionsEnabled'] = true;
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    component['toggle'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component['isOpen']()).toBe(true);
  });

  it('closes panel on outside document click', () => {
    component['isOpen'].set(true);

    component['onDocumentClick'](new MouseEvent('click'));

    expect(component['isOpen']()).toBe(false);
  });

  it('keeps panel open when click is inside host', () => {
    component['isOpen'].set(true);
    const inside = document.createElement('div');
    fixture.nativeElement.appendChild(inside);

    component['onDocumentClick']({ target: inside } as unknown as MouseEvent);

    expect(component['isOpen']()).toBe(true);
  });

  it('closes panel on escape', () => {
    component['isOpen'].set(true);

    component['onEscape']();

    expect(component['isOpen']()).toBe(false);
  });
});
