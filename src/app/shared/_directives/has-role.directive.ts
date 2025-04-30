import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  @Input() set hasRole(role: string) {
    this.updateView(role);
  }

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private supabaseService = inject(SupabaseService);

  private updateView(role: string): void {
    const session = this.supabaseService.getSession();

    if (session?.user?.app_metadata?.['role']) {
      const userRole = session.user.app_metadata?.['role'] as string;
      const hasRole = userRole === role;

      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
