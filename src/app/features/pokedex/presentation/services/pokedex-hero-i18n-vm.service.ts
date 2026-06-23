import { computed, inject, Injectable } from '@angular/core';
import { I18nService } from '../../../../core/i18n/services/i18n.service';
import { PokedexHeroI18nVm } from '../view-models/pokedex-hero-i18n.vm';

@Injectable({
  providedIn: 'root',
})
export class PokedexHeroI18nVmService {
  private readonly _i18nService = inject(I18nService);
  private readonly _translations = this._i18nService.translations;

  public readonly vm = computed<PokedexHeroI18nVm>(() => ({
    title: this._translations()?.pokedex?.hero?.title ?? '',
    subtitle: this._translations()?.pokedex?.hero?.subtitle ?? '',
  }));
}
