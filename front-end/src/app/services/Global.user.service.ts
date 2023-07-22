import {Observable, Observer} from 'rxjs';
import {User} from '../interfaces/User';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GlobalUser {
	globalVarUser : User = {};
	globalVarUserUpdate !: Observable < User >;
	globalVarObserver !: Observer < User >;

	constructor() {
		this.globalVarUserUpdate = new Observable((observer : Observer < User >) => {
			this.globalVarObserver = observer;
		});
	}

	updateGlobalVar(newUser : User) {
		this.globalVarUser = newUser;
		this.globalVarObserver.next(this.globalVarUser);
	}

	getGlobalVarUser() {
		return this.globalVarUser;
	}
}
