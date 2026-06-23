import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialI18nSlice } from './i18n.slice';
import {
  setCurrentLocale,
  setDefaultLanguage,
  setIsLoaded,
  setTranslations,
} from './i18n.updaters';

export const I18nStore = signalStore(
  { providedIn: 'root' },
  withState(initialI18nSlice),
  withComputed((store) => {
    return {};
  }),
  withMethods((store) => ({
    setIsLoaded: (value: any) => patchState(store, setIsLoaded(value)),
    setCurrentLocale: (value: any) => patchState(store, setCurrentLocale(value)),
    setTranslations: (value: any) => patchState(store, setTranslations(value)),
    setDefaultLanguage: (value: any) => patchState(store, setDefaultLanguage(value)),
  })),
);
