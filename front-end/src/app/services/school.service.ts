import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private url = 'http://localhost:5000/home';

  getHomeComponent(){
    return this.httpClient.get(this.url);
  }

  constructor(private httpClient: HttpClient) { }
}
