import { PokemonEntryEntity } from '../../../domain/entity/pokemon-entry.entity';

export interface PokedexPageCacheEntry {
  items: readonly PokemonEntryEntity[];
  hasMore: boolean;
  nextCursor: number | null;
}

export interface PokedexStoreModel {
  items: readonly PokemonEntryEntity[];
  loading: boolean;
  pageIndex: number;
  limit: number;
  hasMore: boolean;
  nextCursor: number | null;
  pagesCache: Record<number, PokedexPageCacheEntry>;
}
