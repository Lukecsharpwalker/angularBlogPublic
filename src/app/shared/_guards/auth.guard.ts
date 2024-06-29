import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

export const authGuard: CanMatchFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAdminStatus().pipe(
    map(isAdmin => {
      if (!isAdmin) {
        router.navigate(['/posts']);
      }
      return isAdmin;
    }),
    take(1)
  );
};
