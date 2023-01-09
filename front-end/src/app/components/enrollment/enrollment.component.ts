import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  menuItems = [
    { name : 'profile', link : '/user/profile'},
    { name : 'home', link : '/student/dashboard'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
