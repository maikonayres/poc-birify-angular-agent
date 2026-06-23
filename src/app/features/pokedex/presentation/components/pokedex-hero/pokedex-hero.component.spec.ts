import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PokedexHeroComponent } from './pokedex-hero.component';
import { PokedexHeroI18nVmService } from '../../services/pokedex-hero-i18n-vm.service';

describe('PokedexHeroComponent', () => {
  let fixture: ComponentFixture<PokedexHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexHeroComponent],
      providers: [
        {
          provide: PokedexHeroI18nVmService,
          useValue: {
            vm: signal({
              title: 'Pokedex',
              subtitle: 'Consulte as entradas da Pokedex do tenant.',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexHeroComponent);
    fixture.detectChanges();
  });

  it('renders translated hero content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Pokedex');
    expect(compiled.querySelector('p')?.textContent?.trim()).toBe(
      'Consulte as entradas da Pokedex do tenant.',
    );
  });
});
