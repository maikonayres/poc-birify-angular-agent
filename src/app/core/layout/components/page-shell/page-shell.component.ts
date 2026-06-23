import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppearanceFacade } from '../../../appearance/facades/appearance.facade';
import { LayoutService } from '../../services/layout.service';
import { Topbar } from '../topbar/topbar.component';
import { AppSidebar } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-page-shell',
  imports: [RouterOutlet, Topbar, AppSidebar],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.css',
})
export class PageShell {
  private readonly layoutService = inject(LayoutService);
  private readonly appearanceFacade = inject(AppearanceFacade);

  containerClass = computed(() => {
    const menuMode = this.appearanceFacade.menuMode();
    const state = this.layoutService.layoutState();

    return {
      'layout-overlay': menuMode === 'overlay',
      'layout-static': menuMode === 'static',
      'layout-static-inactive': state.staticMenuDesktopInactive && menuMode === 'static',
      'layout-overlay-active': state.overlayMenuActive,
      'layout-mobile-active': state.mobileMenuActive,
    };
  });

  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      if (state.mobileMenuActive) {
        document.body.classList.add('blocked-scroll');
      } else {
        document.body.classList.remove('blocked-scroll');
      }
    });
  }
}
