import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Roles } from '../../shared/_enums/roles';
import { SupabaseService } from '../../services/supabase.service';

export const authAdminGuard: CanMatchFn = (): boolean => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  const session = supabaseService.getSession();

  if (session?.user?.app_metadata?.['role'] === Roles.ADMIN) {
    return true;
  } else {
    router.navigate(['/posts']);
    return false;
  }
};
