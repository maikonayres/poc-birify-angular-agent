import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topbar-icon-button',
  templateUrl: './topbar-icon-button.html',
  styleUrl: './topbar-icon-button.scss',
})
export class TopbarIconButton {
  iconClass = input.required<string>();
  highlight = input(false);
  ariaExpanded = input<boolean | null>(null);
  ariaHasPopup = input<boolean | null>(null);

  clicked = output<Event>();

  protected onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
