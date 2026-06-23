import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { SupportedLocale } from '../../constants/supported-languages';
import { I18nFacade } from '../../facades/i18n.facade';
import { LanguageSelectorPanel } from '../language-selector-panel/language-selector-panel.component';

@Component({
  selector: 'app-language-selector-trigger',
  imports: [LanguageSelectorPanel],
  templateUrl: './language-selector-trigger.component.html',
  styleUrl: './language-selector-trigger.component.scss',
})
export class LanguageSelectorTrigger {
  private readonly _i18n = inject(I18nFacade);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly currentLanguage = this._i18n.currentLanguage;
  protected readonly selectLanguageLabel = this._i18n.selectLanguageLabel;
  protected readonly isOpen = signal(false);
  private interactionsEnabled = false;

  constructor() {
    afterNextRender(() => {
      this.interactionsEnabled = true;
    });
  }

  protected toggle(event: Event): void {
    if (!this.interactionsEnabled) {
      return;
    }

    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  protected onLanguageSelected(locale: SupportedLocale): void {
    this._i18n.changeLanguage(locale);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.isOpen.set(false);
  }
}
