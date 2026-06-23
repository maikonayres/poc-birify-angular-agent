import { Component, computed, inject } from '@angular/core';
import { APP_VERSION } from '../../../config/app-version.constant';
import { I18nFacade } from '../../../i18n/facades/i18n.facade';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrl: './sidebar-footer.component.scss',
})
export class SidebarFooter {
  private readonly _i18n = inject(I18nFacade);

  protected readonly appVersion = APP_VERSION;

  protected readonly versionLabel = computed(
    () => this._i18n.translations()?.global?.version ?? 'Version',
  );
}
