import { Component, inject, output } from '@angular/core';
import { I18nFacade } from '../../facades/i18n.facade';
import { SupportedLocale } from '../../constants/supported-languages';

@Component({
  selector: 'app-language-selector-panel',
  templateUrl: './language-selector-panel.component.html',
  styleUrl: './language-selector-panel.component.scss',
})
export class LanguageSelectorPanel {
  private readonly _i18n = inject(I18nFacade);

  protected readonly languages = this._i18n.availableLanguages;
  protected readonly currentLocale = this._i18n.currentLocale;

  languageSelected = output<SupportedLocale>();

  protected selectLanguage(locale: SupportedLocale): void {
    this.languageSelected.emit(locale);
  }
}
