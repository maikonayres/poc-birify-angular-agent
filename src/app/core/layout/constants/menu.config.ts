import { SidebarMenuLabelKey } from '../../../shared/models/i18n.model';

export interface MenuConfigLeaf {
  id: SidebarMenuLabelKey;
  icon: string;
  routerLink: string[];
}

export interface MenuConfigGroup {
  id: SidebarMenuLabelKey;
  items: MenuConfigLeaf[];
}

export const MENU_CONFIG: MenuConfigGroup[] = [
  {
    id: 'homeGroup',
    items: [
      { id: 'dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { id: 'teste', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/teste'] },
    ],
  },
  {
    id: 'auditGroup',
    items: [
      { id: 'auditImages', icon: 'pi pi-fw pi-id-card', routerLink: ['/audit/imagens'] },
    ],
  },
  {
    id: 'pokedexGroup',
    items: [
      { id: 'pokedexList', icon: 'pi pi-fw pi-book', routerLink: ['/pokedex'] },
    ],
  },
];
