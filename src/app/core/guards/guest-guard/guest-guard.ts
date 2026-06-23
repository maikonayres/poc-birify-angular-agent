import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionPort } from '../../ports/session.port';

export const guestGuard: CanActivateFn = () => {
  const session = inject(SessionPort);
  const router = inject(Router);

  return session.isAuthenticated() ? router.createUrlTree(['/home']) : true;
};
