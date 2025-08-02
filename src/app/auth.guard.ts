

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authg = inject(Auth);
  const router = inject(Router)
  if(!authg.isLogged() || authg.isTokenExpired()) {
    authg.logout();
    router.navigate(['/login']);
    return false
  }
  return true
}



