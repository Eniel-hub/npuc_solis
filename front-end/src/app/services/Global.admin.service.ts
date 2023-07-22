import { Observable, Observer } from 'rxjs';
import { Admin } from '../interfaces/Admin';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalAdmin {
  globalVarAdmin: Admin = {};
  globalVarAdminUpdate!: Observable<Admin>;
  globalVarObserver!: Observer<Admin>;

  constructor() {
    this.globalVarAdminUpdate = new Observable((observer: Observer<Admin>) => {
      this.globalVarObserver = observer;
    });
  }

  updateGlobalVar(newAdmin: Admin) {
    this.globalVarAdmin = newAdmin;
    this.globalVarObserver.next(this.globalVarAdmin);
  }

  getGlobalVarAdmin() {
    return this.globalVarAdmin;
  }
}
