import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppearanceFacade } from '../../facades/appearance.facade';
import { AppearanceSurface } from '../../constants/appearance-palettes';

@Component({
  selector: 'app-appearance-configurator',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './appearance-configurator.component.html',
  styleUrl: './appearance-configurator.component.scss',
})
export class AppearanceConfigurator {
  showMenuMode = input(true);

  protected readonly appearance = inject(AppearanceFacade);

  protected updateColors(
    event: Event,
    type: 'primary' | 'surface',
    color: AppearanceSurface,
  ): void {
    if (type === 'primary') {
      this.appearance.updatePrimary(color);
    } else {
      this.appearance.updateSurface(color);
    }

    event.stopPropagation();
  }
}
