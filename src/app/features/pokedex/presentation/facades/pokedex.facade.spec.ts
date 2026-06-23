import { TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { PokedexFacade } from './pokedex.facade';
import { ListPokemonUseCase } from '../../application/use-cases/list-pokemon.use-case';
import { PokedexStore } from '../store/pokedex.store';
import { PokemonEntryEntity } from '../../domain/entity/pokemon-entry.entity';
import { PokemonListPageEntity } from '../../domain/entity/pokemon-list-page.entity';
import { PokedexPageCacheEntry } from '../store/models/pokedex-store.model';

describe('PokedexFacade', () => {
  let facade: PokedexFacade;
  let listPokemonUseCase: { execute: ReturnType<typeof vi.fn> };
  let pagesCache: ReturnType<typeof signal<Record<number, PokedexPageCacheEntry>>>;
  let items: ReturnType<typeof signal<readonly PokemonEntryEntity[]>>;
  let pageIndex: ReturnType<typeof signal<number>>;
  let hasMore: ReturnType<typeof signal<boolean>>;
  let nextCursor: ReturnType<typeof signal<number | null>>;
  let setPageData: ReturnType<typeof vi.fn>;

  const pokemon = new PokemonEntryEntity(25, 'Pikachu', 'Electric', 'Flying', 4, 60);
  const page = new PokemonListPageEntity([pokemon], true, 25);

  beforeEach(() => {
    listPokemonUseCase = { execute: vi.fn() };
    pagesCache = signal<Record<number, PokedexPageCacheEntry>>({});
    items = signal<readonly PokemonEntryEntity[]>([]);
    pageIndex = signal(0);
    hasMore = signal(false);
    nextCursor = signal<number | null>(null);
    setPageData = vi.fn(
      (
        idx: number,
        pageItems: readonly PokemonEntryEntity[],
        pageHasMore: boolean,
        pageNextCursor: number | null,
        cache: Record<number, PokedexPageCacheEntry>,
      ) => {
        pageIndex.set(idx);
        items.set(pageItems);
        hasMore.set(pageHasMore);
        nextCursor.set(pageNextCursor);
        pagesCache.set(cache);
      },
    );

    TestBed.configureTestingModule({
      providers: [
        PokedexFacade,
        { provide: ListPokemonUseCase, useValue: listPokemonUseCase },
        {
          provide: PokedexStore,
          useValue: {
            items: items.asReadonly(),
            loading: signal(false).asReadonly(),
            pageIndex: pageIndex.asReadonly(),
            limit: signal(10).asReadonly(),
            hasMore: hasMore.asReadonly(),
            nextCursor: nextCursor.asReadonly(),
            totalRecords: computed(() => 11),
            pagesCache: pagesCache.asReadonly(),
            setPageData,
          },
        },
      ],
    });

    facade = TestBed.inject(PokedexFacade);
  });

  it('loads first page from API and stores result', () => {
    listPokemonUseCase.execute.mockReturnValue(of(page));

    facade.loadPage(0);

    expect(listPokemonUseCase.execute).toHaveBeenCalledWith({ cursor: undefined, limit: 10 });
    expect(setPageData).toHaveBeenCalledWith(
      0,
      page.items,
      true,
      25,
      expect.objectContaining({
        0: { items: page.items, hasMore: true, nextCursor: 25 },
      }),
    );
  });

  it('serves cached page without calling API', () => {
    const cacheEntry: PokedexPageCacheEntry = {
      items: [pokemon],
      hasMore: true,
      nextCursor: 25,
    };
    pagesCache.set({ 0: cacheEntry });

    facade.loadPage(0);

    expect(listPokemonUseCase.execute).not.toHaveBeenCalled();
    expect(setPageData).toHaveBeenCalledWith(0, cacheEntry.items, true, 25, { 0: cacheEntry });
  });

  it('delegates page change to loadPage when previous page is cached', () => {
    const cacheEntry: PokedexPageCacheEntry = {
      items: [pokemon],
      hasMore: true,
      nextCursor: 25,
    };
    pagesCache.set({ 0: cacheEntry });
    listPokemonUseCase.execute.mockReturnValue(of(page));

    facade.onPageChange({ first: 10, rows: 10 });

    expect(listPokemonUseCase.execute).toHaveBeenCalledWith({ cursor: 25, limit: 10 });
  });
});
