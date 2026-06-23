import { MENU_CONFIG } from '../constants/menu.config';
import { buildMenuModel } from './build-menu-model';

describe('buildMenuModel', () => {
  it('maps config to menu items with translated labels', () => {
    const model = buildMenuModel(MENU_CONFIG, {
      homeGroup: 'Home',
      dashboard: 'Dashboard',
      teste: 'Teste',
      auditGroup: 'Auditoria',
      auditImages: 'Solicitação imagens',
      pokedexGroup: 'Pokedex',
      pokedexList: 'Lista',
    });

    expect(model).toHaveLength(3);
    expect(model[0]).toMatchObject({
      id: 'homeGroup',
      label: 'Home',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home'],
        },
        {
          id: 'teste',
          label: 'Teste',
          icon: 'pi pi-fw pi-check-square',
          routerLink: ['/home/teste'],
        },
      ],
    });
    expect(model[1]).toMatchObject({
      id: 'auditGroup',
      label: 'Auditoria',
      items: [
        {
          id: 'auditImages',
          label: 'Solicitação imagens',
          icon: 'pi pi-fw pi-id-card',
          routerLink: ['/audit/imagens'],
        },
      ],
    });
    expect(model[2]).toMatchObject({
      id: 'pokedexGroup',
      label: 'Pokedex',
      items: [
        {
          id: 'pokedexList',
          label: 'Lista',
          icon: 'pi pi-fw pi-book',
          routerLink: ['/pokedex'],
        },
      ],
    });
  });

  it('falls back to id when translation is missing', () => {
    const model = buildMenuModel(MENU_CONFIG, undefined);

    expect(model[0].label).toBe('homeGroup');
    expect(model[0].items?.[0].label).toBe('dashboard');
  });
});
