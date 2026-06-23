import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { pokedexSlice } from './pokedex.slice';
import { resetPages, setLoading, setPageData } from './pokedex.updaters';
import { PokedexPageCacheEntry } from './models/pokedex-store.model';

export const PokedexStore = signalStore(
  { providedIn: 'root' },
  withState(pokedexSlice),
  withComputed((store) => ({
    totalRecords: computed(() => {
      const pageIndex = store.pageIndex();
      const limit = store.limit();
      const itemsLength = store.items().length;

      if (store.hasMore()) {
        return (pageIndex + 1) * limit + 1;
      }

      return pageIndex * limit + itemsLength;
    }),
  })),
  withMethods((store) => ({
    setLoading: (value: boolean) => patchState(store, setLoading(value)),
    setPageData: (
      pageIndex: number,
      items: PokedexPageCacheEntry['items'],
      hasMore: boolean,
      nextCursor: number | null,
      pagesCache: Record<number, PokedexPageCacheEntry>,
    ) => patchState(store, setPageData(pageIndex, items, hasMore, nextCursor, pagesCache)),
    resetPages: () => patchState(store, resetPages()),
  })),
);
