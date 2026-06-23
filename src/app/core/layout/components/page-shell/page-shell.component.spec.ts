import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { getTestProviders, provideI18nFacadeMock, provideAppearanceFacadeMock } from '../../../../shared/helpers/test-helpers';
import { AuthFacade } from '../../../../features/auth/presentation/facades/auth.facade';
import { PageShell } from './page-shell.component';
import { LayoutService } from '../../services/layout.service';

describe('PageShell', () => {
  let fixture: ComponentFixture<PageShell>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageShell],
      providers: [
        ...getTestProviders(),
        LayoutService,
        provideI18nFacadeMock(),
        provideAppearanceFacadeMock(),
        {
          provide: AuthFacade,
          useValue: { logout: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageShell);
    layoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('blocked-scroll');
  });

  it('applies static layout classes by default', () => {
    expect(fixture.componentInstance.containerClass()).toEqual({
      'layout-overlay': false,
      'layout-static': true,
      'layout-static-inactive': false,
      'layout-overlay-active': false,
      'layout-mobile-active': false,
    });
  });

  it('locks body scroll when mobile menu is active', () => {
    layoutService.layoutState.update((state) => ({ ...state, mobileMenuActive: true }));
    fixture.detectChanges();

    expect(document.body.classList.contains('blocked-scroll')).toBe(true);
  });
});
