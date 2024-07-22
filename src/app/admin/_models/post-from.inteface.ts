import { FormControl } from "@angular/forms";

export interface PostForm {
  title: FormControl<string>;
  content: FormControl<string>;
  description?: FormControl<string | null>;
  date?: FormControl<Date | null>;
}
