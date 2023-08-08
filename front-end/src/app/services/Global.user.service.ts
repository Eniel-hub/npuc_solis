import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalUser {
  globalVarUser: User = {};
  globalVarUserUpdate!: Observable<User>;
  globalVarObserver!: Observer<User>;
  globalVarBehaviorSubject = new BehaviorSubject(this.globalVarUser);

  constructor() {
    this.globalVarUserUpdate = new Observable((observer: Observer<User>) => {
      this.globalVarObserver = observer;
    });
  }

  updateGlobalVar(newUser: User) {
    this.globalVarUser = newUser;
    this.globalVarObserver.next(this.globalVarUser);
    this.globalVarBehaviorSubject.next(this.globalVarUser);
  }

  getGlobalUser = this.globalVarBehaviorSubject.asObservable();

  getGlobalVarUser() {
    return this.globalVarUser;
  }
}
