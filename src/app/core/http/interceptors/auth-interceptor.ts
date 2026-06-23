import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionPort } from '../../ports/session.port';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionPort);
  const token = session.getAccessToken();

  if (!token) {
    return next(req);
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest);
};
