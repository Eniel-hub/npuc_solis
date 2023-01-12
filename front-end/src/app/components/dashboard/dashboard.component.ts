import { globalStudent } from './../../global.student';
import { UserPublishedService } from '../../services/user-published.service';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { cards } from '../../interfaces/cards';
import { User } from '../../interfaces/User';
import { Card } from '../../interfaces/Card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : User = {};
  index : number = 0;
  cards : Card[] = cards;
  student : Student = {};
  card : Card = this.cards[0];
  len : number = this.cards.length;

  menuItems = [
    { name : 'enrollment', link : '/student/enrollment'},
    { name : 'student', link : '/student/profile'},
    { name : 'profile', link : '/user/profile'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  constructor(
    private GlobalStudent : globalStudent,
    private studentService : StudentService,
    private publish : UserPublishedService,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getFirstCard();

    this.userService.getUser()
      .subscribe((response : any) =>{
        if(response.error){
          this.router.navigate(['/user/login']);
          return;
        }
        this.user = response;
        this.publish.emitUserChange(this.user);
      })

    this.studentService.getStudentProfile()
      .subscribe((response : any) => {
        if(response.error){
          this.router.navigate(['/student/application']);
          return;
        }
        this.student = response;
        this.publish.emitStudentChange(this.student);
        this.studentService.setStudentInfo(this.student.ID || 0);

        this.selectedStudent(this.student)
      });
  }

  selectedStudent(student: Student) {
    this.GlobalStudent.updateGlobalVar(student);
  }

  getFirstCard = () =>{
    this.index = Math.floor(Math.random() * (this.len));
    this.card = this.cards[this.index];
  }

  next = () =>{
    if(this.index >= this.len)
      this.index = -1;
    this.index++;
    this.card = this.cards[this.index];
    window.scrollTo(0, 0);
  }

  previous = () =>{
    if(this.index <= 0)
      this.index = this.len;
    this.index--;
    this.card = this.cards[this.index];
    window.scrollTo(0, 0);
  }

}
