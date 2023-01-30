import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

    //isConfirmed Published
    isConfirmed : boolean = false;
    isConfirmedUpdate!: Observable<boolean>;
    observer!: Observer<boolean>;

    constructor () {
      this.isConfirmedUpdate = new Observable((observer: Observer<boolean>) => {
        this.observer = observer;
      });
    }

    updateGlobalVar(isConfirmed : boolean) {
      this.isConfirmed = isConfirmed;
    }

    getGlobalVarStudent(){
      return this.isConfirmed;
    }
}
