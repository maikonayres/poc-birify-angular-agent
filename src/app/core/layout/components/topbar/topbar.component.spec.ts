import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Topbar } from './topbar.component';
import { AuthFacade } from '../../../../features/auth/presentation/facades/auth.facade';
import { LayoutService } from '../../services/layout.service';
import { I18nService } from '../../../i18n/services/i18n.service';
import { AppearanceFacade } from '../../../appearance/facades/appearance.facade';
import { getTestProviders, provideI18nFacadeMock } from '../../../../shared/helpers/test-helpers';

describe('Topbar', () => {
  let fixture: ComponentFixture<Topbar>;
  let authFacade: { logout: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authFacade = { logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Topbar],
      providers: [
        ...getTestProviders(),
        LayoutService,
        { provide: AuthFacade, useValue: authFacade },
        {
          provide: I18nService,
          useValue: { translations: signal({ global: { logout: 'Sair' } }) },
        },
        {
          provide: AppearanceFacade,
          useValue: {
            menuMode: signal('static'),
            isDarkTheme: signal(false),
            toggleDarkTheme: vi.fn(),
            presets: [],
            surfaces: [],
            primaryColors: signal([]),
            preset: signal('Aura'),
            primary: signal('emerald'),
            surface: signal(null),
            darkTheme: signal(false),
            menuModeOptions: [],
            updatePrimary: vi.fn(),
            updateSurface: vi.fn(),
            changePreset: vi.fn(),
            changeMenuMode: vi.fn(),
            hydrate: vi.fn(),
          },
        },
        provideI18nFacadeMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Topbar);
    fixture.detectChanges();
  });

  it('toggles menu open state', () => {
    const event = new Event('click');
    vi.spyOn(event, 'stopPropagation');

    fixture.componentInstance['toggleMenu'](event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(fixture.componentInstance['isMenuOpen']()).toBe(true);
  });

  it('logs out and closes menu', () => {
    fixture.componentInstance['isMenuOpen'].set(true);

    fixture.componentInstance['logout']();

    expect(authFacade.logout).toHaveBeenCalled();
    expect(fixture.componentInstance['isMenuOpen']()).toBe(false);
  });

  it('closes menu on escape', () => {
    fixture.componentInstance['isMenuOpen'].set(true);

    fixture.componentInstance['onEscape']();

    expect(fixture.componentInstance['isMenuOpen']()).toBe(false);
  });

  it('closes menu on outside document click', () => {
    fixture.componentInstance['isMenuOpen'].set(true);
    const host = fixture.nativeElement.querySelector('.topbar-actions-menu-host');
    const outside = document.createElement('div');
    document.body.appendChild(outside);

    fixture.componentInstance['onDocumentClick']({ target: outside } as unknown as MouseEvent);

    expect(fixture.componentInstance['isMenuOpen']()).toBe(false);
    outside.remove();
  });

  it('keeps menu open when click is inside menu host', () => {
    fixture.componentInstance['isMenuOpen'].set(true);
    const host = fixture.nativeElement.querySelector('.topbar-actions-menu-host');
    const inside = document.createElement('button');
    host?.appendChild(inside);

    fixture.componentInstance['onDocumentClick']({ target: inside } as unknown as MouseEvent);

    expect(fixture.componentInstance['isMenuOpen']()).toBe(true);
  });
});
