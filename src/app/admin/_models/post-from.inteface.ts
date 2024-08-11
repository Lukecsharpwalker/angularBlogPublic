import { FormControl } from "@angular/forms";
import { SafeHtml } from "@angular/platform-browser";
import { Timestamp } from "firebase/firestore";

export interface PostForm {
  title: FormControl<string>;
  content: FormControl<string | SafeHtml>;
  isDraft: FormControl<boolean>;
  date: FormControl<Timestamp>;
  description?: FormControl<string | null>;
}
