import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword, onAuthStateChanged, IdTokenResult, } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Credentials } from '../shared/_models/credentials.interface';
import { Roles } from '../shared/_enums/roles';
import { BlogUser } from '../shared/_models/blog-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: WritableSignal<BlogUser | null> = signal(null);

  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();


  loginWithEmail(credentials: Credentials): Promise<void> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user as BlogUser);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.getRoles(idTokenResult);
      });
    })
  }

  //Automaticly login user afrter registration is successful
  registerWithEmail(credentials: Credentials): void {
    createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCredentials) => {
      this.user$.set(userCredentials.user as BlogUser);
      userCredentials.user.getIdTokenResult().then((idTokenResult) => {
        this.getRoles(idTokenResult);
      });
    });
  }

  loginGoogle(): void {
    signInWithPopup(this.auth, this.provider)
      .then((userCredentials) => {
        this.user$.set(userCredentials.user as BlogUser);
        userCredentials.user.getIdTokenResult().then((idTokenResult) => {
          this.getRoles(idTokenResult);
        });
      }).catch((error) => {
        console.error(error);
      })
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.user$.set(null);
    });
  }

  getAdminStatusAndUser(): Observable<boolean> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.user$.set(user as BlogUser);
          this.user$()!.roles = [];
          user.getIdTokenResult().then((idTokenResult: IdTokenResult) => {
            this.getRoles(idTokenResult);
            observer.complete();
          }).catch((error) => {
            observer.error(error);
          });
        } else {
          this.user$.set(null);
          observer.complete();
        }
      });
    });
  }

  private getRoles(idTokenResult: IdTokenResult) {
    if (idTokenResult.claims['admin']) this.user$()!.roles.push(Roles.ADMIN);
    if (idTokenResult.claims['moderator']) this.user$()!.roles.push(Roles.MODERATOR);
    if (idTokenResult.claims['writer']) this.user$()!.roles.push(Roles.WRITER);
    this.user$()!.roles.push(Roles.READER);
  }

  hasRole(role: Roles): boolean {
    return !!this.user$()?.roles.includes(role);
  }

  hasPermission(permission: string): boolean {
    return !!this.user$()?.permissions.includes(permission);
  }
}

