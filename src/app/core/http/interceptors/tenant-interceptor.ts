import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const clientKeys = environment.clientKeys;

  const clientKey = clientKeys?.office;

  if (!clientKey) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'x-client-key': clientKey,
      },
    }),
  );
};
