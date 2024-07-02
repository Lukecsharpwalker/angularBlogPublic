import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export const authGuard: CanMatchFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('GUARD', authService.isAdmin$());
  if (authService.isAdmin$()) {
    return true;
  } else {
    router.navigate(['/posts']);
    return false;
  }

};
