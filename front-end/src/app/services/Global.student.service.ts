import { Observable, Observer } from 'rxjs';
import { Student } from '../interfaces/Student';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStudent {
  globalVarStudent: Student = {};
  globalVarStudentUpdate!: Observable<Student>;
  globalVarObserver!: Observer<Student>;

  constructor() {
    this.globalVarStudentUpdate = new Observable(
      (observer: Observer<Student>) => {
        this.globalVarObserver = observer;
      }
    );
  }

  updateGlobalVar(newStudent: Student) {
    this.globalVarStudent = newStudent;
    this.globalVarObserver.next(this.globalVarStudent);
  }

  getGlobalVarStudent() {
    return this.globalVarStudent;
  }
}
