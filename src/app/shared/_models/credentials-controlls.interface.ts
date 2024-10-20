import { FormControl } from "@angular/forms";

export interface CredentialsForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
