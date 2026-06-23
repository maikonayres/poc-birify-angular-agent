import { PartialStateUpdater } from '@ngrx/signals';
import { PokemonEntryEntity } from '../../domain/entity/pokemon-entry.entity';
import { PokedexPageCacheEntry, PokedexStoreModel } from './models/pokedex-store.model';

export function setLoading(value: boolean): PartialStateUpdater<PokedexStoreModel> {
  return () => ({
    loading: value,
  });
}

export function setPageData(
  pageIndex: number,
  items: readonly PokemonEntryEntity[],
  hasMore: boolean,
  nextCursor: number | null,
  pagesCache: Record<number, PokedexPageCacheEntry>,
): PartialStateUpdater<PokedexStoreModel> {
  return () => ({
    pageIndex,
    items,
    hasMore,
    nextCursor,
    pagesCache,
  });
}

export function resetPages(): PartialStateUpdater<PokedexStoreModel> {
  return () => ({
    items: [],
    pageIndex: 0,
    hasMore: false,
    nextCursor: null,
    pagesCache: {},
  });
}
