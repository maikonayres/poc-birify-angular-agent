import { computed, inject, Injectable } from '@angular/core';
import { I18nService } from '../../../../core/i18n/services/i18n.service';
import { LoginI18nVm } from '../view-models/login-i18n.vm';

@Injectable({
  providedIn: 'root',
})
export class LoginI18nVmService {
  private readonly _i18nService = inject(I18nService);
  private readonly _translations = this._i18nService.translations;

  public readonly vm = computed<LoginI18nVm>(() => ({
    title: this._translations()?.auth?.login?.title ?? '',
    subtitle: this._translations()?.auth?.login?.subtitle ?? '',
    emailLabel: this._translations()?.fields?.email?.label ?? '',
    emailPlaceholder: this._translations()?.fields?.email?.placeholder ?? '',
    passwordLabel: this._translations()?.fields?.password?.label ?? '',
    passwordPlaceholder: this._translations()?.fields?.password?.placeholder ?? '',
    submitButton: this._translations()?.global?.login ?? '',
    forgotPassword: this._translations()?.auth?.login?.forgotPassword ?? '',
    rememberMe: this._translations()?.auth?.login?.rememberMe ?? '',
  }));
}
