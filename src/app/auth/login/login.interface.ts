import { FormControl, FormGroup } from "@angular/forms";

export interface LoginFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LoginForm {
  form: FormGroup<LoginFormControls>;
}
