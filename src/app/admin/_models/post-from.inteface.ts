import { FormControl } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

export interface PostForm {
  title: FormControl<string>;
  content: FormControl<string | SafeHtml>;
  isDraft: FormControl<boolean>;
  date: FormControl<any>;
  description?: FormControl<string | null>;
}
