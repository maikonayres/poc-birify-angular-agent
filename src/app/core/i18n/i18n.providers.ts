import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { I18nFacade } from './facades/i18n.facade';

export function provideI18n(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(I18nFacade).hydrate();
    }),
  ]);
}
