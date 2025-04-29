import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Roles } from '../../shared/_enums/roles';

export const authGuard: CanMatchFn = (): boolean => {
  // const authService = inject(AuthService);
  const router = inject(Router);

  // if (authService.user$()?.roles?.includes(Roles.ADMIN)) {
  //   return true;
  // } else {
  //   router.navigate(['/posts']);
  //   return false;
  // }
  return true;
};
