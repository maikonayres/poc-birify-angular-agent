import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { SessionPort } from '../../core/ports/session.port';
import { AuthSessionPort } from './domain/ports/auth-session.port';
import { AuthRepository } from './domain/repositories/auth.repository';
import { RestAuthRepository } from './infrastructure/api/repositories/rest-auth.repository';
import { AuthSessionAdapter } from './presentation/adapters/auth-session.adapter';

export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    AuthSessionAdapter,
    { provide: AuthSessionPort, useExisting: AuthSessionAdapter },
    { provide: SessionPort, useExisting: AuthSessionAdapter },
    { provide: AuthRepository, useClass: RestAuthRepository },
    provideAppInitializer(() => inject(AuthSessionPort).hydrateSession()),
  ]);
}
