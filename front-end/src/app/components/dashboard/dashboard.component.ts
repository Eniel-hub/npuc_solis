import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { User } from '../../interfaces/User'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : User = {};


  menuItems = [
    { name : 'logout', link : '/user/logout'}
  ]

  constructor( private studentService : StudentService) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('userInfo') || ""));

    this.studentService.getStudentProfile()
        .subscribe(response => {
          console.log('.......................')
          console.log(response)
          console.log('.......................')
        });
  }

}
