import { MenuItem } from 'primeng/api';
import { MenuConfigGroup } from '../constants/menu.config';
import { SidebarMenuLabels } from '../../../shared/models/i18n.model';

export interface AppMenuItem extends MenuItem {
  id: string;
  items?: AppMenuItem[];
}

function resolveLabel(
  labels: Partial<SidebarMenuLabels> | undefined,
  id: keyof SidebarMenuLabels,
): string {
  return labels?.[id] ?? id;
}

export function buildMenuModel(
  config: MenuConfigGroup[],
  labels: Partial<SidebarMenuLabels> | undefined,
): AppMenuItem[] {
  return config.map((group) => ({
    id: group.id,
    label: resolveLabel(labels, group.id),
    items: group.items.map((item) => ({
      id: item.id,
      label: resolveLabel(labels, item.id),
      icon: item.icon,
      routerLink: item.routerLink,
    })),
  }));
}
