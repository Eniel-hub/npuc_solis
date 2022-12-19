import { CanActivate, Router } from '@angular/router';
import { StudentService } from './student.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(
    private userService : UserService,
    private route : Router
  ) { }

    canActivate(){
    if(this.userService.isAuthenticated())
      return true;
    this.route.navigate(['/user/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthGuardStudentService implements CanActivate {
  constructor(
    private studentService : StudentService,
    private route : Router
  ) { }

  canActivate = async() =>{
    if(await this.studentService.isStudent())
      return true;
    this.route.navigate(['/student/application']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthGuardNotStudentService implements CanActivate {
  constructor(
    private studentService : StudentService,
    private route : Router
  ) { }

  canActivate= async() =>{
    if(await !this.studentService.isStudent())
      return true;
    this.route.navigate(['/student/dashboard']);
    return false;
  }
}
