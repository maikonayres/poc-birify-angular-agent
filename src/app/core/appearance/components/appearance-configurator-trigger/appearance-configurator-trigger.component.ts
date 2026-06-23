import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { TopbarIconButton } from '../../../layout/components/topbar-icon-button/topbar-icon-button';
import { AppearanceConfigurator } from '../appearance-configurator/appearance-configurator.component';

@Component({
  selector: 'app-appearance-configurator-trigger',
  imports: [TopbarIconButton, AppearanceConfigurator],
  templateUrl: './appearance-configurator-trigger.component.html',
  styleUrl: './appearance-configurator-trigger.component.scss',
})
export class AppearanceConfiguratorTrigger {
  showMenuMode = input(true);

  private readonly elementRef = inject(ElementRef<HTMLElement>);

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
