import { computed, inject, Injectable, signal } from '@angular/core';
import { AppearanceFacade } from '../../appearance/facades/appearance.facade';

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  configSidebarVisible: boolean;
  mobileMenuActive: boolean;
  menuHoverActive: boolean;
  activePath: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly _appearanceFacade = inject(AppearanceFacade);

  layoutState = signal<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    mobileMenuActive: false,
    menuHoverActive: false,
    activePath: null,
  });

  isSidebarActive = computed(
    () => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive,
  );

  isOverlay = computed(() => this._appearanceFacade.menuMode() === 'overlay');

  transitionComplete = signal<boolean>(false);

  onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));
    }

    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        mobileMenuActive: !this.layoutState().mobileMenuActive,
      }));
    }
  }

  showConfigSidebar() {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
  }

  hideConfigSidebar() {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }
}
