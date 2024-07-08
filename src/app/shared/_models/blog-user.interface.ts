import { User } from "@angular/fire/auth";

export interface BlogUser extends User {
  roles: string[];
  permissions: string[];
}
