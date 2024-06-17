import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../_models/credentials.interface';

@Component({
  selector: 'blog-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCompontent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', {nonNullable: true}),
    password: new FormControl<string>('', {nonNullable: true}),
  });
  isSubmitted = false;

  private authService = inject(AuthService);

  onSubmit(): void {
    this.isSubmitted = true;
    this.authService.loginWithEmail(this.loginForm.value as Credentials);
  }
  onGoogleLogin() {
    throw new Error('Method not implemented.');
  }
}
