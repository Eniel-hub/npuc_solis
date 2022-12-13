import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems = [
    { name : 'logout', link : '/user/logout'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
