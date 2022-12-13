import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  homelink : string = '';
  menuItems = [
    { name : 'home',             link : this.homelink  },
    { name : 'privacy policy',   link : '/policy/'       },
  ]

  constructor() { }

  ngOnInit(): void {
    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    if(url.match('student'))
      this.homelink = '/student/dashboard'
    else
      this.homelink = '/home'
  }

}
