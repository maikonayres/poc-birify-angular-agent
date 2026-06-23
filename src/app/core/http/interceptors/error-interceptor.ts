import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionPort } from '../../ports/session.port';

export const SKIP_SESSION_EXPIRED_HANDLING = new HttpContextToken<boolean>(() => false);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const session = inject(SessionPort);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.context.get(SKIP_SESSION_EXPIRED_HANDLING)) {
        session.clearSession();
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    }),
  );
};
