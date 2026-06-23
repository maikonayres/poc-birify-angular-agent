import { Component, inject } from '@angular/core';
import { PokedexHeroI18nVmService } from '../../services/pokedex-hero-i18n-vm.service';

@Component({
  selector: 'app-pokedex-hero',
  templateUrl: './pokedex-hero.component.html',
  styleUrl: './pokedex-hero.component.css',
})
export class PokedexHeroComponent {
  private readonly _pokedexHeroI18nVmService = inject(PokedexHeroI18nVmService);

  protected readonly vm = this._pokedexHeroI18nVmService.vm;
}
