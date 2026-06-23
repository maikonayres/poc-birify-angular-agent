import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokedexListPage } from './pokedex-list.page';
import { PokedexHeroI18nVmService } from '../../services/pokedex-hero-i18n-vm.service';
import { PokedexFacade } from '../../facades/pokedex.facade';
import { PokedexListTableI18nVmService } from '../../services/pokedex-list-table-i18n-vm.service';

describe('PokedexListPage', () => {
  let fixture: ComponentFixture<PokedexListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexListPage],
      providers: [
        {
          provide: PokedexHeroI18nVmService,
          useValue: {
            vm: signal({ title: 'Pokedex', subtitle: 'Subtitle' }),
          },
        },
        {
          provide: PokedexListTableI18nVmService,
          useValue: {
            vm: signal({
              empty: 'Empty',
              columns: {
                dexNumber: '#',
                name: 'Name',
                typePrimary: 'Type 1',
                typeSecondary: 'Type 2',
                heightDm: 'Height',
                weightHg: 'Weight',
              },
            }),
          },
        },
        {
          provide: PokedexFacade,
          useValue: {
            items: signal([]).asReadonly(),
            loading: signal(false).asReadonly(),
            pageIndex: signal(0).asReadonly(),
            totalRecords: signal(0).asReadonly(),
            loadPage: vi.fn(),
            onPageChange: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexListPage);
    fixture.detectChanges();
  });

  it('renders hero and table components', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-pokedex-hero')).toBeTruthy();
    expect(compiled.querySelector('app-pokedex-list-table')).toBeTruthy();
  });
});
