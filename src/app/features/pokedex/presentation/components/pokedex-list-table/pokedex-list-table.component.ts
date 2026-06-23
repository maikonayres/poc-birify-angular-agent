import { Component, computed, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PokedexFacade } from '../../facades/pokedex.facade';
import { PokedexListTableI18nVmService } from '../../services/pokedex-list-table-i18n-vm.service';
import { POKEDEX_PAGE_LIMIT } from '../../store/pokedex.slice';

@Component({
  selector: 'app-pokedex-list-table',
  templateUrl: './pokedex-list-table.component.html',
  styleUrl: './pokedex-list-table.component.css',
  imports: [TableModule],
})
export class PokedexListTableComponent implements OnInit {
  protected readonly facade = inject(PokedexFacade);
  private readonly _pokedexListTableI18nVmService = inject(PokedexListTableI18nVmService);

  protected readonly items = computed(() => [...this.facade.items()]);
  protected readonly vm = this._pokedexListTableI18nVmService.vm;
  protected readonly pageLimit = POKEDEX_PAGE_LIMIT;

  public ngOnInit(): void {
    this.facade.loadPage(0);
  }

  protected onPageChange(event: TableLazyLoadEvent): void {
    this.facade.onPageChange(event);
  }

  protected formatTypeSecondary(value: string | null): string {
    return value ?? '-';
  }
}
