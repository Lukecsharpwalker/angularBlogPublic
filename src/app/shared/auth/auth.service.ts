import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Credentials } from '../_models/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: WritableSignal<User | null> = signal(null);
  isAdmin$: WritableSignal<boolean> = signal(false);

  private provider = new GoogleAuthProvider();
  private auth = inject(Auth);

  loginWithEmail(credentials: Credentials): Promise<void> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(!!idTokenResult.claims['admin']);
      });
    })
  }

  //Automaticly login user afrter registration is successful
  registerWithEmail(credentials: Credentials): void {
    createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(!!idTokenResult.claims['admin']);
      });
    });
  }

  loginGoogle(): void {
    this.logout();
    console.log(this.user$())
    signInWithPopup(this.auth, this.provider)
    .then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(!!idTokenResult.claims['admin']);
      });
    })
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.user$.set(null);
      this.isAdmin$.set(false);
    });
  }
}
