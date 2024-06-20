import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../_models/credentials.interface';
import { DynamicDialogService } from '../../dynamic-dialog/dynamic-dialog.service';

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
        this.dynamicDialogService.closeDialog();
        console.log(this.authService.user$());
      })
      .catch(() => {
        this.loginError.set(true);
      });
  }
  onGoogleLogin() {
    this.authService.loginGoogle();
    this.dynamicDialogService.closeDialog();
  }
}
