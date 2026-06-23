import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokedexListTableComponent } from './pokedex-list-table.component';
import { PokedexFacade } from '../../facades/pokedex.facade';
import { PokedexListTableI18nVmService } from '../../services/pokedex-list-table-i18n-vm.service';
import { PokemonEntryEntity } from '../../../domain/entity/pokemon-entry.entity';

describe('PokedexListTableComponent', () => {
  let fixture: ComponentFixture<PokedexListTableComponent>;
  let facade: {
    items: { (): readonly PokemonEntryEntity[] };
    loading: { (): boolean };
    pageIndex: { (): number };
    totalRecords: { (): number };
    loadPage: ReturnType<typeof vi.fn>;
    onPageChange: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    facade = {
      items: signal([
        new PokemonEntryEntity(25, 'Pikachu', 'Electric', 'Flying', 4, 60),
      ]).asReadonly(),
      loading: signal(false).asReadonly(),
      pageIndex: signal(0).asReadonly(),
      totalRecords: signal(11).asReadonly(),
      loadPage: vi.fn(),
      onPageChange: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PokedexListTableComponent],
      providers: [
        { provide: PokedexFacade, useValue: facade },
        {
          provide: PokedexListTableI18nVmService,
          useValue: {
            vm: signal({
              empty: 'Nenhum Pokémon encontrado.',
              columns: {
                dexNumber: '#',
                name: 'Nome',
                typePrimary: 'Tipo 1',
                typeSecondary: 'Tipo 2',
                heightDm: 'Altura (dm)',
                weightHg: 'Peso (hg)',
              },
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexListTableComponent);
    fixture.detectChanges();
  });

  it('loads first page on init', () => {
    expect(facade.loadPage).toHaveBeenCalledWith(0);
  });

  it('renders pokemon row', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cells = compiled.querySelectorAll('tbody td');

    expect(cells[0]?.textContent?.trim()).toBe('25');
    expect(cells[1]?.textContent?.trim()).toBe('Pikachu');
    expect(cells[2]?.textContent?.trim()).toBe('Electric');
    expect(cells[3]?.textContent?.trim()).toBe('Flying');
    expect(cells[4]?.textContent?.trim()).toBe('4');
    expect(cells[5]?.textContent?.trim()).toBe('60');
  });
});
