import { UserPublishedService } from '../../services/user-published.service';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : User = {};
  student : Student = {};
  count : number = 0;

  menuItems = [
    { name : 'logout', link : '/user/logout'}
  ]

  constructor(
    private studentService : StudentService,
    private publish : UserPublishedService,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe((response : any) =>{
        if(response.error){
          this.router.navigate(['/user/login']);
          return;
        }
        this.publish.emitUserChange(response)
      })

    this.publish.userSet.subscribe(userP => {
      this.user = userP
    })

    this.studentService.getStudentProfile()
        .subscribe((response : any) => {
          if(response.error){
            this.router.navigate(['/student/application']);
            return;
          }
          this.publish.emitStudentChange(response)
        });

      this.publish.studentSet.subscribe(studentP =>{
        this.student = studentP;
      })
  }

  print = () =>{
    console.log(this.user)
    console.log('.......................')
    console.log(this.student)
    console.log('.......................')

    this.count++;
  }

}
