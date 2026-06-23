import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { PokemonListPageEntity } from '../../domain/entity/pokemon-list-page.entity';
import {
  ListPokemonParams,
  PokedexRepository,
} from '../../domain/repositories/pokedex.repository';
import { PokedexStore } from '../../presentation/store/pokedex.store';

@Injectable({
  providedIn: 'root',
})
export class ListPokemonUseCase {
  private readonly _pokedexRepository = inject(PokedexRepository);
  private readonly _pokedexStore = inject(PokedexStore);

  public execute(params: ListPokemonParams): Observable<PokemonListPageEntity> {
    this._pokedexStore.setLoading(true);

    return this._pokedexRepository.list(params).pipe(
      finalize(() => {
        this._pokedexStore.setLoading(false);
      }),
    );
  }
}
