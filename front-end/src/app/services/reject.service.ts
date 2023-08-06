import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RejectService {
  //isConfirmed Published
  isRejected: boolean = false;
  isRejectedUpdate!: Observable<boolean>;
  observer!: Observer<boolean>;

  constructor() {
    this.isRejectedUpdate = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
    });
  }

  updateGlobalVar(isRejected: boolean) {
    this.isRejected = isRejected;
  }

  getGlobalVarStudent() {
    return this.isRejected;
  }
}
