import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { I18nService } from '../../../../core/i18n/services/i18n.service';

@Injectable({
  providedIn: 'root',
})
export class LoginErrorMapper {
  private readonly _i18n = inject(I18nService);

  public map(error: HttpErrorResponse): string {
    const translations = this._i18n.translations();

    if (error.status === 401) {
      return (
        translations?.auth?.errors?.invalidCredentials ??
        'Invalid email or password. Please check and try again.'
      );
    }

    if (error.status === 0) {
      return translations?.errors?.connection ?? 'Could not connect. Check your internet connection.';
    }

    if (error.status >= 500) {
      return translations?.errors?.generic ?? 'Something went wrong. Please try again.';
    }

    return translations?.errors?.generic ?? 'Something went wrong. Please try again.';
  }
}
