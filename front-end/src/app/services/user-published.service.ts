import { Student } from '../interfaces/Student';
import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserPublishedService {

  //user Published
  userP = new Subject<User>();
  userSet = this.userP.asObservable();
  emitUserChange(user : User){
    this.userP.next(user);
  }

  //student Publised
  private studentP = new Subject<Student>();
  studentSet = this.studentP.asObservable();
  emitStudentChange(student: Student){
    this.studentP.next(student)
  }
}
