import { inject, Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { tap } from 'rxjs';
import { ListPokemonUseCase } from '../../application/use-cases/list-pokemon.use-case';
import { PokemonListPageEntity } from '../../domain/entity/pokemon-list-page.entity';
import { PokedexPageCacheEntry } from '../store/models/pokedex-store.model';
import { PokedexStore } from '../store/pokedex.store';

@Injectable({
  providedIn: 'root',
})
export class PokedexFacade {
  private readonly _listPokemonUseCase = inject(ListPokemonUseCase);
  private readonly _pokedexStore = inject(PokedexStore);

  public readonly items = this._pokedexStore.items;
  public readonly loading = this._pokedexStore.loading;
  public readonly pageIndex = this._pokedexStore.pageIndex;
  public readonly limit = this._pokedexStore.limit;
  public readonly hasMore = this._pokedexStore.hasMore;
  public readonly totalRecords = this._pokedexStore.totalRecords;

  public loadPage(pageIndex: number): void {
    const cached = this._pokedexStore.pagesCache()[pageIndex];

    if (cached) {
      this._applyPage(pageIndex, cached);
      return;
    }

    const cursor = this.resolveCursor(pageIndex);

    if (pageIndex > 0 && cursor === undefined) {
      return;
    }

    this._listPokemonUseCase
      .execute({
        cursor,
        limit: this._pokedexStore.limit(),
      })
      .pipe(
        tap((page) => {
          this._storePage(pageIndex, page);
        }),
      )
      .subscribe();
  }

  public onPageChange(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? this._pokedexStore.limit();
    const pageIndex = Math.floor((event.first ?? 0) / rows);
    this.loadPage(pageIndex);
  }

  private resolveCursor(pageIndex: number): number | undefined {
    if (pageIndex === 0) {
      return undefined;
    }

    const previousPage = this._pokedexStore.pagesCache()[pageIndex - 1];
    return previousPage?.nextCursor ?? undefined;
  }

  private _storePage(pageIndex: number, page: PokemonListPageEntity): void {
    const cacheEntry: PokedexPageCacheEntry = {
      items: page.items,
      hasMore: page.hasMore,
      nextCursor: page.nextCursor,
    };

    const pagesCache = {
      ...this._pokedexStore.pagesCache(),
      [pageIndex]: cacheEntry,
    };

    this._applyPage(pageIndex, cacheEntry, pagesCache);
  }

  private _applyPage(
    pageIndex: number,
    cacheEntry: PokedexPageCacheEntry,
    pagesCache = this._pokedexStore.pagesCache(),
  ): void {
    this._pokedexStore.setPageData(
      pageIndex,
      cacheEntry.items,
      cacheEntry.hasMore,
      cacheEntry.nextCursor,
      pagesCache,
    );
  }
}
