import { Component } from '@angular/core';
import { PokedexHeroComponent } from '../../components/pokedex-hero/pokedex-hero.component';
import { PokedexListTableComponent } from '../../components/pokedex-list-table/pokedex-list-table.component';

@Component({
  selector: 'app-pokedex-list-page',
  templateUrl: './pokedex-list.page.html',
  styleUrl: './pokedex-list.page.css',
  imports: [PokedexHeroComponent, PokedexListTableComponent],
})
export class PokedexListPage {}
