import { Admin } from '../interfaces/Admin';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminUserPublishedService {
  constructor() {}

  //admin Published
  adminP = new Subject<Admin>();
  adminSet = this.adminP.asObservable();
  emitAdminChange(admin: Admin) {
    this.adminP.next(admin);
  }
}
