import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword, onAuthStateChanged, IdTokenResult, } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Credentials } from '../shared/_models/credentials.interface';

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

  getAdminStatusAndUser(): Observable<boolean> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.user$.set(user);
          user.getIdTokenResult().then((idTokenResult: IdTokenResult) => {
            this.isAdmin$.set(idTokenResult.claims['admin'] as boolean);
            observer.complete();
          }).catch((error) => {
            observer.error(error);
          });
        } else {
          this.isAdmin$.set(false);
          this.user$.set(null);
          observer.complete();
        }
      });
    });
  }
}

