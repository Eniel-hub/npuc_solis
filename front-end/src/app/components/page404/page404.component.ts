import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {
  imgSrc : string = ""
  homelink : string = '';
  menuItems = [ { name : 'home',  link : this.homelink  } ]

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.imgSrc = "../../../assets/imgs/404-bg2.gif";
    this.getImgSrc();

    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    if(url.match('student'))
      this.homelink = '/student/dashboard'
    else
      this.homelink = '/home'
  }

  getImgSrc() : void {
    setTimeout( () =>{
      this.imgSrc = "../../../assets/imgs/404-bg.png"
    }, 5000);
  }

}
