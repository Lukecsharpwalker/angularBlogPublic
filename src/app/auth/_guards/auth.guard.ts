import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanMatchFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin$()) {
    return true;
  } else {
    router.navigate(['/posts']);
    return false;
  }
};
