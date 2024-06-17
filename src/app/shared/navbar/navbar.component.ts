import { ChangeDetectionStrategy, Component, ViewContainerRef, inject } from '@angular/core';
import { LoginCompontent } from '../auth/login/login.component';
import { DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';

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
  private dynamicDialogService = inject(DynamicDialogService);
  private viewContainerRef = inject(ViewContainerRef);

  singIn() {
    this.dynamicDialogService.openDialog(LoginCompontent, this.viewContainerRef);
  }
}
