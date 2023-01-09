import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserUrl = 'http://localhost:5000/user';
  private loginUrl = 'http://localhost:5000/user/login';
  private logoutUrl = 'http://localhost:5000/user/logout';
  private registerUrl = 'http://localhost:5000/user/register';
  private updatePasswordUrl = 'http://localhost:5000/user/password';
  private profilePictureUrl = 'http://localhost:5000/user/profile-picture';

  getUser(){
    return this.httpClient.get(this.getUserUrl, {withCredentials : true});
  }

  isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  setUserInfo(user : any){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  //todo: set timer for the session and logout at end of timer

  validate = (user : User) => {
    return this.httpClient.post(this.loginUrl,
                                {'username' : user.username,
                                 'password' : user.password},
                                {withCredentials : true});
  }

  saveUser = (user : User) =>{
    return this.httpClient.post(this.registerUrl,
                                {"username" : user.username,
                                "password" : user.password});
  }

  logOut = () =>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('studentInfo');
    return this.httpClient.get(this.logoutUrl,
                                {withCredentials : true});
  }

  updatePassword = (password : string, newPassword : string) =>{
    return this.httpClient.post(this.updatePasswordUrl,
                                {"password" : password,
                                 "newPassword" : newPassword},
                                {withCredentials : true})
  }

  constructor(private httpClient: HttpClient) { }
}
