import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListPokemonUseCase } from './list-pokemon.use-case';
import { PokedexRepository } from '../../domain/repositories/pokedex.repository';
import { PokedexStore } from '../../presentation/store/pokedex.store';
import { PokemonEntryEntity } from '../../domain/entity/pokemon-entry.entity';
import { PokemonListPageEntity } from '../../domain/entity/pokemon-list-page.entity';

describe('ListPokemonUseCase', () => {
  let useCase: ListPokemonUseCase;
  let repository: { list: ReturnType<typeof vi.fn> };
  let pokedexStore: { setLoading: ReturnType<typeof vi.fn> };

  const page = new PokemonListPageEntity(
    [new PokemonEntryEntity(25, 'Pikachu', 'Electric', 'Flying', 4, 60)],
    true,
    25,
  );

  beforeEach(() => {
    repository = { list: vi.fn() };
    pokedexStore = { setLoading: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ListPokemonUseCase,
        { provide: PokedexRepository, useValue: repository },
        { provide: PokedexStore, useValue: pokedexStore },
      ],
    });

    useCase = TestBed.inject(ListPokemonUseCase);
  });

  it('sets loading and returns page on success', () => {
    repository.list.mockReturnValue(of(page));

    useCase.execute({ limit: 10 }).subscribe((result) => {
      expect(result).toBe(page);
    });

    expect(pokedexStore.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(repository.list).toHaveBeenCalledWith({ limit: 10 });
    expect(pokedexStore.setLoading).toHaveBeenLastCalledWith(false);
  });

  it('clears loading on error', () => {
    repository.list.mockReturnValue(throwError(() => new Error('fail')));

    useCase.execute({ limit: 10 }).subscribe({ error: () => {} });

    expect(pokedexStore.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(pokedexStore.setLoading).toHaveBeenLastCalledWith(false);
  });
});
