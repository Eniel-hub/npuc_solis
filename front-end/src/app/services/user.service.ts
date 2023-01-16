import { Injectable } from '@angular/core';
import { ServerIP } from '../../../config';
import { ServerPORT } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserUrl = `http://${ServerIP}:${ServerPORT}/user`;
  private loginUrl = `http://${ServerIP}:${ServerPORT}/user/login`;
  private logoutUrl = `http://${ServerIP}:${ServerPORT}/user/logout`;
  private registerUrl = `http://${ServerIP}:${ServerPORT}/user/register`;
  private updatePasswordUrl = `http://${ServerIP}:${ServerPORT}/user/password`;
  private profilePictureUrl = `http://${ServerIP}:${ServerPORT}/user/profile-picture`;

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
                                 "password" : user.password,
                                 "student_id" : user.student_id});
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
