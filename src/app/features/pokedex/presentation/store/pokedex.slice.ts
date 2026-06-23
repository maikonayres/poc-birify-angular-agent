import { PokedexStoreModel } from './models/pokedex-store.model';

export const POKEDEX_PAGE_LIMIT = 5;

export const pokedexSlice: PokedexStoreModel = {
  items: [],
  loading: false,
  pageIndex: 0,
  limit: POKEDEX_PAGE_LIMIT,
  hasMore: false,
  nextCursor: null,
  pagesCache: {},
};
