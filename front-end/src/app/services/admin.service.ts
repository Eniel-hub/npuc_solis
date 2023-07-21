import { Injectable } from '@angular/core';
import { ServerIP } from '../../../config';
import { ServerPORT } from '../../../config';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private getUserUrl = `http://${ServerIP}:${ServerPORT}/spa/user`;
  private loginUrl = `http://${ServerIP}:${ServerPORT}/spa/user/login`;
  private logoutUrl = `http://${ServerIP}:${ServerPORT}/spa/user/logout`;
  private updatePasswordUrl = `http://${ServerIP}:${ServerPORT}/spa/user/password`;
  private forgetPasswordUrl = `http://${ServerIP}:${ServerPORT}/spa/user/fpassword`;

  getUser() {
    return this.httpClient.get(this.getUserUrl, { withCredentials: true });
  }

  isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  isAdmin(): Boolean {
    let userData = localStorage.getItem('type');
    if (userData?.toLowerCase().match('admin')) {
      return true;
    }
    return false;
  }

  setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.parse(user).ID);
    localStorage.setItem('type', JSON.parse(user).type);
  }

  validate = (admin: Admin) => {
    return this.httpClient.post(
      this.loginUrl,
      { username: admin.ID, password: admin.password },
      { withCredentials: true }
    );
  };

  logOut = () => {
    localStorage.removeItem('type');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('studentInfo');
    return this.httpClient.get(this.logoutUrl, { withCredentials: true });
  };

  updatePassword = (password: string, newPassword: string) => {
    return this.httpClient.post(
      this.updatePasswordUrl,
      { password: password, newPassword: newPassword },
      { withCredentials: true }
    );
  };

  forgetPassword = (admin: Admin) => {
    return this.httpClient.post(this.forgetPasswordUrl, {
      ID: admin.ID,
      password: admin.password,
    });
  };

  constructor(private httpClient: HttpClient) {}
}
