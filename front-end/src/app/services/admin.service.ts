import { Injectable } from '@angular/core';
import { ServerIP } from '../../../config';
import { ServerPORT } from '../../../config';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';
import { User } from '../interfaces/User';
import { GlobalUser } from './Global.user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private getUserUrl = `http://${ServerIP}:${ServerPORT}/admin`;
  private loginUrl = `http://${ServerIP}:${ServerPORT}/admin/login`;
  private logoutUrl = `http://${ServerIP}:${ServerPORT}/admin/logout`;
  private deleRegUrl = `http://${ServerIP}:${ServerPORT}/admin/delereg`;
  private apprRegUrl = `http://${ServerIP}:${ServerPORT}/admin/apprreg`;
  private rejeRegUrl = `http://${ServerIP}:${ServerPORT}/admin/rejereg`;
  private getSchoolUrl = `http://${ServerIP}:${ServerPORT}/admin/getsch`;
  private getStudentsUrl = `http://${ServerIP}:${ServerPORT}/admin/getstu`;
  private getTeacherUrl = `http://${ServerIP}:${ServerPORT}/admin/getteach`;
  private getSchoolYearsUrl = `http://${ServerIP}:${ServerPORT}/admin/getyears`;
  private updatePasswordUrl = `http://${ServerIP}:${ServerPORT}/admin/password`;
  private getGradeLevelsUrl = `http://${ServerIP}:${ServerPORT}/admin/getgrades`;
  private forgetPasswordUrl = `http://${ServerIP}:${ServerPORT}/admin/fpassword`;
  private getGradeSectionsUrl = `http://${ServerIP}:${ServerPORT}/admin/getsections`;
  private getRegistrationUrl = `http://${ServerIP}:${ServerPORT}/admin/getregistration`;

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
    localStorage.setItem('userInfo', user.ID);
    localStorage.setItem('type', user.type);
    localStorage.setItem('isLoggedIn', 'true');
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

  GetRegistration = (regID: number) => {
    return this.httpClient.post(
      this.getRegistrationUrl,
      {
        regid: regID,
      },
      { withCredentials: true }
    );
  };

  deleteRegistration = (regID: number) => {
    return this.httpClient.post(
      this.deleRegUrl,
      { regid: regID },
      { withCredentials: true }
    );
  };
  approveRegistration = (regID: number, registration: any) => {
    return this.httpClient.post(
      this.apprRegUrl,
      {
        regid: regID,
        student_id: registration.student_id,
        fullname: registration.fullname,
        school_year_id: registration.school_year_id,
        stype: registration.stype,
        reg_date: registration.reg_date,
        school_year: registration.school_year,
        is_enrollment: registration.is_enrollment,
        grade_level: registration.grade_level,
        application_date: registration.application_date,
        status: registration.status,
        remarks: registration.remarks,
        section: registration.section,
      },
      { withCredentials: true }
    );
  };
  rejectRegistration = (regID: number) => {
    return this.httpClient.post(
      this.rejeRegUrl,
      { regid: regID },
      { withCredentials: true }
    );
  };

  constructor(private httpClient: HttpClient) {}
}
