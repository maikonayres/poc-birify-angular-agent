import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionPort } from '../../ports/session.port';

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionPort);
  const router = inject(Router);

  return session.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
