import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { LayoutService } from './layout.service';
import { AppearanceFacade } from '../../appearance/facades/appearance.facade';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutService,
        {
          provide: AppearanceFacade,
          useValue: { menuMode: signal('static') },
        },
      ],
    });
    service = TestBed.inject(LayoutService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('toggles static desktop menu on wide screens', () => {
    vi.spyOn(service, 'isDesktop').mockReturnValue(true);

    service.onMenuToggle();
    expect(service.layoutState().staticMenuDesktopInactive).toBe(true);

    service.onMenuToggle();
    expect(service.layoutState().staticMenuDesktopInactive).toBe(false);
  });

  it('toggles mobile menu on narrow screens', () => {
    vi.spyOn(service, 'isDesktop').mockReturnValue(false);

    service.onMenuToggle();
    expect(service.layoutState().mobileMenuActive).toBe(true);
    expect(service.isSidebarActive()).toBe(true);
  });

  it('toggles overlay menu when menu mode is overlay', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        LayoutService,
        {
          provide: AppearanceFacade,
          useValue: { menuMode: signal('overlay') },
        },
      ],
    });
    service = TestBed.inject(LayoutService);
    vi.spyOn(service, 'isDesktop').mockReturnValue(false);

    service.onMenuToggle();

    expect(service.layoutState().overlayMenuActive).toBe(true);
    expect(service.isOverlay()).toBe(true);
  });

  it('shows and hides config sidebar', () => {
    service.showConfigSidebar();
    expect(service.layoutState().configSidebarVisible).toBe(true);

    service.hideConfigSidebar();
    expect(service.layoutState().configSidebarVisible).toBe(false);
  });
});
