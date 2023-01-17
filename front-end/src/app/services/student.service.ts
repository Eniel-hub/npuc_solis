import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServerIP } from '../../../config';
import { ServerPORT } from '../../../config';
import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { UserPublishedService } from './user-published.service';
import { StudentApplication } from '../interfaces/StudentApplication';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  student : Student = {};

  constructor(
    private httpClient : HttpClient,
    private service : UserPublishedService
  ) { }

  private url = `http://${ServerIP}:${ServerPORT}/student/profile`;
  private natUrl = `http://${ServerIP}:${ServerPORT}/student/nation`;
  private catUrl = `http://${ServerIP}:${ServerPORT}/student/category`;
  private reliUrl = `http://${ServerIP}:${ServerPORT}/student/religion`;
  private gradeUrl = `http://${ServerIP}:${ServerPORT}/student/gradelevel`;
  private applicationUrl = `http://${ServerIP}:${ServerPORT}/student/application`;

  getStudentProfile(){
    return this.httpClient.get(this.url, {withCredentials:true});
  }

  getGradeLevel(){
    return this.httpClient.get(this.gradeUrl, {withCredentials : true});
  }

  getStudentCat(){
    return this.httpClient.get(this.catUrl);
  }

  getAllReligions(){
    return this.httpClient.get(this.reliUrl);
  }

  getAllNations(){
    return this.httpClient.get(this.natUrl);
  }

  isStudent() : Boolean {
    let userData = localStorage.getItem('studentInfo')
    if(userData && userData!== '0' && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  setStudentInfo(ID : number){
    localStorage.setItem('studentInfo', JSON.stringify(ID));
  }

  registerStudent(appli : StudentApplication){
    let application = JSON.stringify(appli)
    return this.httpClient.post(this.applicationUrl,
                                  appli,
                                  {withCredentials : true});
  }

}
