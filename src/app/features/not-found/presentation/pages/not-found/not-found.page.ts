import { Location } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppearanceConfiguratorTrigger } from '../../../../../core/appearance/components/appearance-configurator-trigger/appearance-configurator-trigger.component';
import { AppearanceThemeToggle } from '../../../../../core/appearance/components/appearance-theme-toggle/appearance-theme-toggle.component';
import { LanguageSelectorTrigger } from '../../../../../core/i18n/components/language-selector-trigger/language-selector-trigger.component';
import { I18nService } from '../../../../../core/i18n/services/i18n.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    AppearanceThemeToggle,
    AppearanceConfiguratorTrigger,
    LanguageSelectorTrigger,
  ],
})
export class NotFoundPage {
  private readonly location = inject(Location);
  private readonly i18n = inject(I18nService);

  protected readonly vm = computed(() => {
    const notFound = this.i18n.translations()?.notFound;

    return {
      code: notFound?.code ?? '404',
      title: notFound?.title ?? 'Page not found',
      subtitle: notFound?.subtitle ?? 'The page you are looking for does not exist.',
      backHome: notFound?.backHome ?? 'Back to home',
      goBack: notFound?.goBack ?? 'Go back',
    };
  });

  protected goBack(): void {
    this.location.back();
  }
}
