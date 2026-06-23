import { Component, inject } from '@angular/core';
import { AuditImagesI18nVmService } from '../../services/audit-images-i18n-vm.service';

@Component({
  selector: 'app-audit-images-page',
  templateUrl: './audit-images.page.html',
  styleUrl: './audit-images.page.css',
})
export class AuditImagesPage {
  private readonly _auditImagesI18nVmService = inject(AuditImagesI18nVmService);

  protected readonly vm = this._auditImagesI18nVmService.vm;
}
