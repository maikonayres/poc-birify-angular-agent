import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { concat, defer, EMPTY, timer } from 'rxjs';
import { finalize, ignoreElements } from 'rxjs/operators';
import { LoadingService } from '../../loading/services/loading.service';
import { LoadingMode } from './loading-mode.enum';
import { LoadingScope } from './loading-scope.enum';

export { LoadingMode } from './loading-mode.enum';
export { LoadingScope } from './loading-scope.enum';

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);
export const LOADING_MODE = new HttpContextToken<LoadingMode>(() => LoadingMode.Global);
export const LOADING_SCOPE = new HttpContextToken<string>(() => LoadingScope.Default);
export const LOADING_MIN_DURATION_MS = new HttpContextToken<number>(() => 0);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }

  const mode = req.context.get(LOADING_MODE);
  const scope = req.context.get(LOADING_SCOPE);
  const minDurationMs = req.context.get(LOADING_MIN_DURATION_MS);
  if (mode === LoadingMode.None) {
    return next(req);
  }

  const loadingService = inject(LoadingService);
  const startedAt = Date.now();
  if (mode === LoadingMode.Local) {
    loadingService.showLocal(scope);
  } else {
    loadingService.show();
  }

  return concat(
    next(req),
    defer(() => {
      const elapsedMs = Date.now() - startedAt;
      const waitMs = Math.max(0, minDurationMs - elapsedMs);
      return waitMs > 0 ? timer(waitMs).pipe(ignoreElements()) : EMPTY;
    }),
  ).pipe(
    finalize(() => {
      if (mode === LoadingMode.Local) {
        loadingService.hideLocal(scope);
        return;
      }

      loadingService.hide();
    }),
  );
};
