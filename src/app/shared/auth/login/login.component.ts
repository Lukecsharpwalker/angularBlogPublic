import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
onGoogleLogin() {
throw new Error('Method not implemented.');
}
  private authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit(): void {
    console.log(this.loginForm.value);
    // this.authService.loginWithEmail(this.loginForm.value);
  }
}
