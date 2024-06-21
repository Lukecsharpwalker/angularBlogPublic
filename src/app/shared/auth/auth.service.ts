import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Credentials } from '../_models/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: WritableSignal<User | null> = signal(null);
  isAdmin$: WritableSignal<boolean> = signal(false);

  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();

  loginWithEmail(credentials: Credentials): Promise<void> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(idTokenResult.claims['admin'] as boolean);
      });
    })
  }

  //Automaticly login user afrter registration is successful
  registerWithEmail(credentials: Credentials): void {
    createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(idTokenResult.claims['admin'] as boolean);
      });
    });
  }

  loginGoogle(): void {
    signInWithPopup(this.auth, this.provider)
    .then((userCredentials) => {
      this.user$.set(userCredentials.user);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.isAdmin$.set(idTokenResult.claims['admin'] as boolean);
      });
    }).catch((error) => {
      console.error(error);
    })
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.user$.set(null);
      this.isAdmin$.set(false);
    });
  }
}
