import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from '../menuitem/menuitem.component';
import { I18nFacade } from '../../../i18n/facades/i18n.facade';
import { MENU_CONFIG } from '../../constants/menu.config';
import { buildMenuModel } from '../../helpers/build-menu-model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitem, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class AppMenu {
  private readonly _i18n = inject(I18nFacade);

  protected readonly model = computed(() =>
    buildMenuModel(MENU_CONFIG, this._i18n.translations()?.nav?.sidebar),
  );
}
