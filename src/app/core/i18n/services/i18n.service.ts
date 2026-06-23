import { computed, DOCUMENT, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nStore } from '../store/i18n.store';
import { Observable, Subject } from 'rxjs';
import { LocaleEnum } from '../../../shared/enums/locale.enum';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly _document = inject(DOCUMENT);
  private readonly _i18nStore = inject(I18nStore);
  public readonly translations = this._i18nStore.translations;
  public readonly currentLocale = this._i18nStore.currentLocale;
  private readonly _translateService = inject(TranslateService);
  private readonly isDone$ = new Subject<boolean>();

  constructor() {
    this._translateService.onFallbackLangChange.subscribe((curr) => {
      const lacale = curr.lang as LocaleEnum;
      this._setDocumentLang(lacale);
      this._i18nStore.setCurrentLocale(lacale);
      this._i18nStore.setTranslations(curr.translations);
      this._i18nStore.setDefaultLanguage(this._translateService.getFallbackLang());

      this.isDone$.next(true);
      this.isDone$.complete();
    });

    this._translateService.onLangChange.subscribe((curr) => {
      const lacale = curr.lang as LocaleEnum;

      this._setDocumentLang(lacale);
      this._i18nStore.setCurrentLocale(lacale);
      this._i18nStore.setTranslations(curr.translations);
    });
  }

  public init(): Observable<boolean> {
    return this.isDone$.asObservable();
  }

  public setCurrentLanguage(lang: string): void {
    this._translateService.use(lang).subscribe({
      next: (curr) => {},
      error: (err) => {
        console.error('Error loading translations', err);
      },
    });
  }

  private _setDocumentLang(lang: LocaleEnum): void {
    this._document.documentElement.lang = lang;
  }
}
