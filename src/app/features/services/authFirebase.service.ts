import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  private firebaseAuth: Auth = inject(Auth);
  private currentUserSig: WritableSignal<User | null | undefined> = signal<
    User | null | undefined
  >(undefined);
  private user$ = user(this.firebaseAuth);

  public getCurrentUserSig() {
    return this.currentUserSig();
  }

  public setCurrentUserSig(value: any): void {
    this.currentUserSig.set(value);
  }

  public getUserObs() {
    return this.user$;
  }

  constructor() {}

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
