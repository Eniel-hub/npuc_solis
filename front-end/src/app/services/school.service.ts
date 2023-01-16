import { ServerIP } from './../../../config';
import { ServerPORT } from './../../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private url = `http://${ServerIP}:${ServerPORT}/home`;
  private GradeUrl = `http://${ServerIP}:${ServerPORT}/school/grades`;

  getHomeComponent(){
    return this.httpClient.get(this.url);
  }

  getGrades(ID : number){
    return this.httpClient.post(this.GradeUrl,
                                {school_id : ID})
  }

  constructor(private httpClient: HttpClient) { }
}
