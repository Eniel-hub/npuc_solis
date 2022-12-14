import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient : HttpClient) { }

  private url = 'http://localhost:5000/student/profile';

  getStudentProfile(){
    return this.httpClient.get(this.url, {withCredentials:true});
  }
}
