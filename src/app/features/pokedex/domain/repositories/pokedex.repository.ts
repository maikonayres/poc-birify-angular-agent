import { Observable } from 'rxjs';
import { PokemonListPageEntity } from '../entity/pokemon-list-page.entity';

export interface ListPokemonParams {
  cursor?: number;
  limit: number;
  sort?: 'asc' | 'desc';
}

export abstract class PokedexRepository {
  public abstract list(params: ListPokemonParams): Observable<PokemonListPageEntity>;
}
