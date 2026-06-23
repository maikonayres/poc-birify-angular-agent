import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppearanceConfiguratorTrigger } from '../../../appearance/components/appearance-configurator-trigger/appearance-configurator-trigger.component';
import { AppearanceThemeToggle } from '../../../appearance/components/appearance-theme-toggle/appearance-theme-toggle.component';
import { LanguageSelectorTrigger } from '../../../i18n/components/language-selector-trigger/language-selector-trigger.component';
import { I18nService } from '../../../i18n/services/i18n.service';
import { AuthFacade } from '../../../../features/auth/presentation/facades/auth.facade';
import { LayoutService } from '../../services/layout.service';
import { TopbarIconButton } from '../topbar-icon-button/topbar-icon-button';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterLink,
    TopbarIconButton,
    AppearanceThemeToggle,
    AppearanceConfiguratorTrigger,
    LanguageSelectorTrigger,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class Topbar {
  private readonly authFacade = inject(AuthFacade);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly i18n = inject(I18nService);

  protected readonly layoutService = inject(LayoutService);
  protected readonly isMenuOpen = signal(false);

  protected readonly logoutLabel = computed(
    () => this.i18n.translations()?.global?.logout ?? 'Logout',
  );

  protected toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen.update((open) => !open);
  }

  protected logout(): void {
    this.isMenuOpen.set(false);
    this.authFacade.logout();
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const menuHost = this.elementRef.nativeElement.querySelector('.topbar-actions-menu-host');
    if (menuHost && !menuHost.contains(event.target as Node)) {
      this.isMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.isMenuOpen.set(false);
  }
}
