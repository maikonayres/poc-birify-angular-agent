import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../../../features/auth/presentation/facades/auth.facade';

@Component({
  selector: 'app-logout-button',
  template: `
    <button (click)="onLogout()" class="layout-topbar-action" type="button">
      <i class="pi pi-sign-out"></i>
    </button>
  `,
})
export class LogoutButton {
  private readonly _authFacade = inject(AuthFacade);

  protected onLogout(): void {
    this._authFacade.logout();
  }
}
