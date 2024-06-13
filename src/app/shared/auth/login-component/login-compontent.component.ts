import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-compontent',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login-compontent.component.html',
  styleUrl: './login-compontent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCompontentComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
