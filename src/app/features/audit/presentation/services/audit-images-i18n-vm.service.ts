import { computed, inject, Injectable } from '@angular/core';
import { I18nService } from '../../../../core/i18n/services/i18n.service';
import { AuditImagesI18nVm } from '../view-models/audit-images-i18n.vm';

@Injectable({
  providedIn: 'root',
})
export class AuditImagesI18nVmService {
  private readonly _i18nService = inject(I18nService);
  private readonly _translations = this._i18nService.translations;

  public readonly vm = computed<AuditImagesI18nVm>(() => ({
    title: this._translations()?.audit?.images?.title ?? '',
    description: this._translations()?.audit?.images?.description ?? '',
  }));
}
