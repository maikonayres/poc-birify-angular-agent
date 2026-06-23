import { Component, computed, inject } from '@angular/core';
import { AppearanceFacade } from '../../facades/appearance.facade';
import { TopbarIconButton } from '../../../layout/components/topbar-icon-button/topbar-icon-button';

@Component({
  selector: 'app-appearance-theme-toggle',
  imports: [TopbarIconButton],
  templateUrl: './appearance-theme-toggle.component.html',
})
export class AppearanceThemeToggle {
  protected readonly appearance = inject(AppearanceFacade);

  protected readonly iconClass = computed(() =>
    this.appearance.isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun',
  );

  protected toggleDarkTheme(): void {
    this.appearance.toggleDarkTheme();
  }
}
