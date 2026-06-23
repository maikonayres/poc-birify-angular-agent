import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppSidebar } from './sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { provideAppearanceFacadeMock, provideI18nFacadeMock } from '../../../../shared/helpers/test-helpers';

describe('AppSidebar', () => {
  let fixture: ComponentFixture<AppSidebar>;
  let component: AppSidebar;
  let layoutService: LayoutService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebar],
      providers: [
        provideRouter([]),
        LayoutService,
        provideAppearanceFacadeMock(),
        provideI18nFacadeMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSidebar);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('resets menu state on route change', () => {
    layoutService.layoutState.update((state) => ({
      ...state,
      overlayMenuActive: true,
      mobileMenuActive: true,
      menuHoverActive: true,
    }));

    component['onRouteChange']('/home');

    const state = layoutService.layoutState();
    expect(state.activePath).toBe('/home');
    expect(state.overlayMenuActive).toBe(false);
    expect(state.mobileMenuActive).toBe(false);
    expect(state.menuHoverActive).toBe(false);
  });

  it('binds outside click listener when overlay menu is active on desktop', () => {
    vi.spyOn(layoutService, 'isDesktop').mockReturnValue(true);
    const addSpy = vi.spyOn(document, 'addEventListener');

    layoutService.layoutState.update((state) => ({ ...state, overlayMenuActive: true }));
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('closes mobile menu on outside click', () => {
    vi.spyOn(layoutService, 'isDesktop').mockReturnValue(false);
    layoutService.layoutState.update((state) => ({ ...state, mobileMenuActive: true }));
    fixture.detectChanges();

    component['bindOutsideClickListener']();
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(layoutService.layoutState().mobileMenuActive).toBe(false);
  });

  it('initializes active path from current router url', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/home/teste');

    component.ngOnInit();

    expect(layoutService.layoutState().activePath).toBe('/home/teste');
  });
});
