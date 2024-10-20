import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogService } from '../../shared/dynamic-dialog/dynamic-dialog.service';
import { Credentials } from '../../shared/_models/credentials.interface';
import { ModalCloseStatusEnum, ModalStatus } from '../../shared/_models/modal-status.interface';
import { LoginFormControls } from './login.interface';


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

  form = new FormGroup<LoginFormControls>({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  isSubmitted = false;
  loginError: WritableSignal<boolean> = signal(false);

  private authService = inject(AuthService);
  private dynamicDialogService = inject(DynamicDialogService);

  onSubmit(): void {
    this.isSubmitted = true;
    this.authService.loginWithEmail(this.form.value as Credentials)
      .then(() => {
        this.loginError.set(false);
        const status = {
          closeStatus: ModalCloseStatusEnum.ACCEPTED
        } as ModalStatus;
        this.dynamicDialogService.closeDialog(status);
      })
      .catch(() => {
        this.loginError.set(true);
      });
  }
  onGoogleLogin() {
    this.authService.loginGoogle();
    const status = {
      closeStatus: ModalCloseStatusEnum.ACCEPTED
    } as ModalStatus;
    this.dynamicDialogService.closeDialog(status);
  }
}
