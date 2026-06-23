import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppMenu } from './menu.component';
import { provideAppearanceFacadeMock } from '../../../../shared/helpers/test-helpers';
import { I18nFacade } from '../../../i18n/facades/i18n.facade';

describe('AppMenu', () => {
  let fixture: ComponentFixture<AppMenu>;
  let component: AppMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenu],
      providers: [
        provideRouter([]),
        provideAppearanceFacadeMock(),
        {
          provide: I18nFacade,
          useValue: {
            translations: signal({
              nav: {
                sidebar: {
                  homeGroup: 'Home',
                  dashboard: 'Dashboard',
                  teste: 'Teste',
                  auditGroup: 'Auditoria',
                  auditImages: 'Solicitação imagens',
                  pokedexGroup: 'Pokedex',
                  pokedexList: 'List',
                },
              },
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('builds navigation model from translations', () => {
    const model = component['model']();

    expect(model).toHaveLength(3);
    expect(model[0].label).toBe('Home');
    expect(model[0].items?.[0].routerLink).toEqual(['/home']);
    expect(model[1].label).toBe('Auditoria');
    expect(model[1].items?.[0].routerLink).toEqual(['/audit/imagens']);
    expect(model[2].label).toBe('Pokedex');
    expect(model[2].items?.[0].routerLink).toEqual(['/pokedex']);
  });
});
