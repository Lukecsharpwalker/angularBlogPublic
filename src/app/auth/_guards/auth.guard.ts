import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Roles } from '../../shared/_enums/roles';
import { SupabaseService } from '../../services/supabase.service';

export const authGuard: CanMatchFn = (): boolean => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  const session = supabaseService.getSession();

  // For now, just check if the user is authenticated
  // In a real application, you would check for specific roles in the user's metadata
  if (session) {
    return true;
  } else {
    router.navigate(['/posts']);
    return false;
  }
};
