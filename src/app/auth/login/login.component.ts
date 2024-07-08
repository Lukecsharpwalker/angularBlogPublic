import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogService } from '../../shared/dynamic-dialog/dynamic-dialog.service';
import { Credentials } from '../../shared/_models/credentials.interface';
import { ModalStatusEnum } from '../../shared/_models/modal-status.interface';


@Component({
  selector: 'blog-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCompontent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  isSubmitted = false;
  loginError: WritableSignal<boolean> = signal(false);

  private authService = inject(AuthService);
  private dynamicDialogService = inject(DynamicDialogService);

  onSubmit(): void {
    this.isSubmitted = true;
    this.authService.loginWithEmail(this.loginForm.value as Credentials)
      .then(() => {
        this.loginError.set(false);
        this.dynamicDialogService.closeDialog(ModalStatusEnum.ACCEPTED);
      })
      .catch(() => {
        this.loginError.set(true);
      });
  }
  onGoogleLogin() {
    this.authService.loginGoogle();
    this.dynamicDialogService.closeDialog(ModalStatusEnum.ACCEPTED);
  }
}
