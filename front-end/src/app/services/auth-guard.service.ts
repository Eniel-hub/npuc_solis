import { CanActivate, Router } from '@angular/router';
import { StudentService } from './student.service';
import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { GlobalUser } from './Global.user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user: any;
  constructor(private route: Router, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate() {
    if (this.user) return true;
    this.route.navigate(['/home']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardStudentService implements CanActivate {
  user: any;
  constructor(private route: Router, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate = async () => {
    console.log('can activate', this.user);
    if (this.user.type == 'student' && this.user.student_id) return true;
    if (this.user.type != 'student') {
      this.route.navigate(['/home']);
      return false;
    }
    this.route.navigate(['/student/application']);
    return false;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardNotStudentService implements CanActivate {
  user: any;
  constructor(private route: Router, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate = async () => {
    if (this.user.type == 'student' && !this.user.student_id) return true;
    if (this.user.type != 'student') {
      this.route.navigate(['/home']);
      return false;
    }
    this.route.navigate(['/student/dashboard']);
    return false;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdminService implements CanActivate {
  user: any;
  constructor(private route: Router, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate = async () => {
    if (this.user.type == 'admin') return true;
    this.route.navigate(['/admin/login']);
    return false;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardStaffService implements CanActivate {
  user: any;
  constructor(private route: Router, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate = async () => {
    if (this.user.type == 'admin' || this.user.type == 'staff') return true;
    this.route.navigate(['/staff/login']);
    return false;
  };
}
