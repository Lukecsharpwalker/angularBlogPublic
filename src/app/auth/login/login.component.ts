import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogService } from '../../shared/dynamic-dialog/dynamic-dialog.service';
import { SupabaseService } from '../../services/supabase.service';
import { Credentials } from '../../shared/_models/credentials.interface';
import {
  ModalCloseStatusEnum,
  ModalStatus,
} from '../../shared/_models/modal-status.interface';
import { LoginFormControls } from './login.interface';

@Component({
  selector: 'blog-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCompontent {
  form = new FormGroup<LoginFormControls>({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  isSubmitted = false;
  loginError: WritableSignal<boolean> = signal(false);

  private dynamicDialogService = inject(DynamicDialogService);
  private supabaseService = inject(SupabaseService);

  onSubmit(): void {
    this.isSubmitted = true;
    const credentials = this.form.value as Credentials;

    this.supabaseService.signInWithPassword(credentials.email, credentials.password)
      .then(({ data, error }) => {
        if (error) {
          this.loginError.set(true);
          return;
        }

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
    this.supabaseService.signInWithProvider('google')
      .then(({ data, error }) => {
        if (!error) {
          const status = {
            closeStatus: ModalCloseStatusEnum.ACCEPTED
          } as ModalStatus;
          this.dynamicDialogService.closeDialog(status);
        }
      });
  }
}
