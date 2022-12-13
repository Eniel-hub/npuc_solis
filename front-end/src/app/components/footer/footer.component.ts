import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  homeLink : string = '';

  constructor() { }

  ngOnInit(): void {
    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    switch (url) {
      case '/':
      case '/home':
        this.homeLink = '#home';
        break;
      case '/user/login':
        this.homeLink = '/user/login';
        break;
      case '/user/register':
        this.homeLink = '/user/register';
        break;
      default:
        this.homeLink = '/student/dashboard';
    }
  }

}
