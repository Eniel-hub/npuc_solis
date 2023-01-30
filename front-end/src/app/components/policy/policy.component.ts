import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  homelink : string = '';
  menuItems = [
    { name : 'home',       link : this.homelink  },
    { name : 'About',      link : '/about-us'  }
  ]

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    if(url.match('student'))
      this.homelink = '/student/dashboard'
    else
      this.homelink = '/home'
  }
}
