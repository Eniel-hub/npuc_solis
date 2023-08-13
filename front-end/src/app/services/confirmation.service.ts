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

  //reject enrollment confirmation
  isConfirmedRE: boolean = false;
  isConfirmedUpdateRE!: Observable<boolean>;
  observerRE!: Observer<boolean>;

  //approve enrollment confirmation
  isConfirmedAP: boolean = false;
  isConfirmedUpdateAP!: Observable<boolean>;
  observerAP!: Observer<boolean>;

  constructor() {
    this.isConfirmedUpdate = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
    });
    this.isConfirmedUpdateDE = new Observable((observer: Observer<boolean>) => {
      this.observerDE = observer;
    });
    this.isConfirmedUpdateRE = new Observable((observer: Observer<boolean>) => {
      this.observerRE = observer;
    });
    this.isConfirmedUpdateAP = new Observable((observer: Observer<boolean>) => {
      this.observerAP = observer;
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

  updateGlobalVarRE(isConfirmedRE: boolean) {
    this.isConfirmedRE = isConfirmedRE;
  }

  getGlobalVarRE() {
    return this.isConfirmedRE;
  }

  updateGlobalVarAP(isConfirmedAP: boolean) {
    this.isConfirmedAP = isConfirmedAP;
  }

  getGlobalVarAP() {
    return this.isConfirmedAP;
  }
}
