import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  //isConfirmed Published
  isConfirmed: boolean = false;
  isConfirmedUpdate!: Observable<boolean>;
  observer!: Observer<boolean>;

  //delete enrollment confirmation
  isConfirmedDE: boolean = false;
  isConfirmedUpdateDE!: Observable<boolean>;
  observerDE!: Observer<boolean>;

  constructor() {
    this.isConfirmedUpdate = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
    });
    this.isConfirmedUpdateDE = new Observable((observer: Observer<boolean>) => {
      this.observerDE = observer;
    });
  }

  updateGlobalVar(isConfirmed: boolean) {
    this.isConfirmed = isConfirmed;
  }

  getGlobalVar() {
    return this.isConfirmed;
  }

  updateGlobalVarDE(isConfirmedDE: boolean) {
    this.isConfirmedDE = isConfirmedDE;
  }

  getGlobalVarDE() {
    return this.isConfirmedDE;
  }
}
