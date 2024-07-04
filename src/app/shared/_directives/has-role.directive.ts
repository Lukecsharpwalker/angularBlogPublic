import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  @Input() set hasRole(roles: string[]) {
    this.updateView(roles);
  }

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  private updateView(roles: string[]): void {
    const user = this.authService.user$();
    if (user?.roles) {
      const hasRole = user.roles.some(role => roles.includes(role));
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
