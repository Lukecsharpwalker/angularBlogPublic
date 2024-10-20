import { FormControl, FormGroup } from "@angular/forms";

export interface AddImageControls {
  src: FormControl<string | null>;
  alt: FormControl<string | null>;
}

export interface AddImageForm {
  form: FormGroup<AddImageControls>;
}
