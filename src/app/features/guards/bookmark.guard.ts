import { CanActivateFn, Router } from '@angular/router';
import { AuthFirebaseService } from '../services/authFirebase.service';
import { inject } from '@angular/core';

export const bookmarkGuard: CanActivateFn = (route, state) => {
  const auth: AuthFirebaseService = inject(AuthFirebaseService);
  const router: Router = inject(Router);

  if (auth.getCurrentUserSig()) return true;
  else {
    router.navigateByUrl('/login');
    return false;
  }
};
