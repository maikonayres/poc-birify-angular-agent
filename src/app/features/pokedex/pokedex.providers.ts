import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { PokedexRepository } from './domain/repositories/pokedex.repository';
import { RestPokedexRepository } from './infrastructure/api/repositories/rest-pokedex.repository';

export function providePokedex(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: PokedexRepository, useClass: RestPokedexRepository },
  ]);
}
