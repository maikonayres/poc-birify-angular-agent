import { computed, inject, Injectable } from '@angular/core';
import { I18nService } from '../../../../core/i18n/services/i18n.service';
import { PokedexListTableI18nVm } from '../view-models/pokedex-list-table-i18n.vm';

@Injectable({
  providedIn: 'root',
})
export class PokedexListTableI18nVmService {
  private readonly _i18nService = inject(I18nService);
  private readonly _translations = this._i18nService.translations;

  public readonly vm = computed<PokedexListTableI18nVm>(() => ({
    empty: this._translations()?.pokedex?.table?.empty ?? '',
    columns: {
      dexNumber: this._translations()?.pokedex?.table?.columns?.dexNumber ?? '',
      name: this._translations()?.pokedex?.table?.columns?.name ?? '',
      typePrimary: this._translations()?.pokedex?.table?.columns?.typePrimary ?? '',
      typeSecondary: this._translations()?.pokedex?.table?.columns?.typeSecondary ?? '',
      heightDm: this._translations()?.pokedex?.table?.columns?.heightDm ?? '',
      weightHg: this._translations()?.pokedex?.table?.columns?.weightHg ?? '',
    },
  }));
}
