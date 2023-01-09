import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'student', link : '/student/profile'},
    { name : 'profile', link : '/user/profile'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
