import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

export function authInnitializer(authService: AuthService): () => Observable<boolean> {
  return () => authService.getAdminStatusAndUser();
}
