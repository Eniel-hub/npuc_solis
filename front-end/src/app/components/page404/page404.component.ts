import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {
  imgSrc : string = ""
  homeLink : string = '/student/dashboard';
  menuItems :any;
  home : string = 'dashboard';

  constructor( private userService : UserService ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.imgSrc = "../../../assets/imgs/404-bg2.gif";
    this.getImgSrc();
    let auth = this.userService.isAuthenticated()
    if(!auth){
      this.homeLink = '/home';
      this.home = 'home';
    }
    this.menuItems = [
      { name : this.home,             link : this.homeLink  },
      { name : 'about',            link : '/about-us' },
      { name : 'privacy policy',   link : '/policy'       },
    ]
  }

  getImgSrc() : void {
    setTimeout( () =>{
      this.imgSrc = "../../../assets/imgs/404-bg.png"
    }, 5000);
  }

}
