import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/http/interceptors/loading-interceptor';
import { tenantInterceptor } from './core/http/interceptors/tenant-interceptor';
import { authInterceptor } from './core/http/interceptors/auth-interceptor';
import { errorInterceptor } from './core/http/interceptors/error-interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAuth } from './features/auth/auth.providers';
import { providePokedex } from './features/pokedex/pokedex.providers';
import { provideAppearance } from './core/appearance/appearance.providers';
import { provideI18n } from './core/i18n/i18n.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withPreloading(PreloadAllModules),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, tenantInterceptor, authInterceptor, errorInterceptor]),
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
      fallbackLang: 'pt-BR',
    }),
    provideAuth(),
    providePokedex(),
    provideAppearance(),
    provideI18n(),
  ],
};
