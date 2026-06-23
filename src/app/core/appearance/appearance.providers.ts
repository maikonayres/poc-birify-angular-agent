import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { AppearanceFacade } from './facades/appearance.facade';

export function provideAppearance(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(AppearanceFacade).hydrate();
    }),
  ]);
}
