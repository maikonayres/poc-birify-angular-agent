import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PokemonListPageEntity } from '../../../domain/entity/pokemon-list-page.entity';
import {
  ListPokemonParams,
  PokedexRepository,
} from '../../../domain/repositories/pokedex.repository';
import { ListPokedexCursorResponseDto } from '../dtos/list-pokedex-cursor-response.dto';
import { PokedexMapper } from '../mappers/pokedex.mapper';

@Injectable({
  providedIn: 'root',
})
export class RestPokedexRepository implements PokedexRepository {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = environment.apiUrl;

  public list(params: ListPokemonParams): Observable<PokemonListPageEntity> {
    let httpParams = new HttpParams().set('limit', params.limit.toString());

    if (params.cursor !== undefined) {
      httpParams = httpParams.set('cursor', params.cursor.toString());
    }

    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }

    return this._http
      .get<ListPokedexCursorResponseDto>(`${this._baseUrl}/pokedex`, { params: httpParams })
      .pipe(map(PokedexMapper.toListPageEntity));
  }
}
