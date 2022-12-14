import { UserService } from 'src/app/services/user.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private userService : UserService, private route : Router) { }

  canActivate(){
    if(this.userService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['/user/login']);
    return false;
  }
}
