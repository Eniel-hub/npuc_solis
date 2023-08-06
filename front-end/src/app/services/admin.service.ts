import { Injectable } from '@angular/core';
import { ServerIP } from '../../../config';
import { ServerPORT } from '../../../config';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private getUserUrl = `http://${ServerIP}:${ServerPORT}/admin`;
  private getSchoolUrl = `http://${ServerIP}:${ServerPORT}/admin/getsch`;
  private getStudentsUrl = `http://${ServerIP}:${ServerPORT}/admin/getstu`;
  private loginUrl = `http://${ServerIP}:${ServerPORT}/admin/login`;
  private logoutUrl = `http://${ServerIP}:${ServerPORT}/admin/logout`;
  private updatePasswordUrl = `http://${ServerIP}:${ServerPORT}/admin/password`;
  private forgetPasswordUrl = `http://${ServerIP}:${ServerPORT}/admin/fpassword`;
  private getSchoolYearsUrl = `http://${ServerIP}:${ServerPORT}/admin/getyears`;
  private getGradeLevelsUrl = `http://${ServerIP}:${ServerPORT}/admin/getgrades`;
  private getGradeSectionsUrl = `http://${ServerIP}:${ServerPORT}/admin/getsections`;
  private getTeacherUrl = `http://${ServerIP}:${ServerPORT}/admin/getteach`;

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

  getSchool = (user: User) => {
    return this.httpClient.post(this.getSchoolUrl, { admin: user });
  };

  getStudents = (section_id: number, school_year_id: number) => {
    return this.httpClient.post(this.getStudentsUrl, {
      section_id: section_id,
      school_year_id: school_year_id,
    });
  };

  getSchoolYears = () => {
    return this.httpClient.get(this.getSchoolYearsUrl);
  };

  getGradeLevels = (school_id: number) => {
    return this.httpClient.post(this.getGradeLevelsUrl, {
      school_id: school_id,
    });
  };

  getGradeSections = (grade_id: number) => {
    return this.httpClient.post(this.getGradeSectionsUrl, {
      grade_id: grade_id,
    });
  };

  getTeacher = (section_id: number) => {
    return this.httpClient.post(this.getTeacherUrl, { section_id: section_id });
  };

  constructor(private httpClient: HttpClient) {}
}
