import { ChangeDetectionStrategy, Component, ViewContainerRef, inject } from '@angular/core';
import { DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';
import { AuthService } from '../../auth/auth.service';
import { LoginCompontent } from '../../auth/login/login.component';

@Component({
  selector: 'blog-navbar',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public authService = inject(AuthService);

  private dynamicDialogService = inject(DynamicDialogService);
  private viewContainerRef = inject(ViewContainerRef);

  signIn() {
    this.dynamicDialogService.openDialog(
      LoginCompontent,
      this.viewContainerRef,
      { title: 'Sign In'}
    );
  };
}
