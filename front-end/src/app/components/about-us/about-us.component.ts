import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserPublishedService } from 'src/app/services/user-published.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  homeLink : string =  '/student/dashboard';
  menuItems :any;
  home : string = 'dashboard';

  constructor( private userService : UserService ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let auth = this.userService.isAuthenticated()
    if(!auth){
      this.homeLink = '/home'
      this.home = 'home';
    }
    this.menuItems = [
      { name : this.home,          link : this.homeLink  },
      { name : 'privacy policy',   link : '/policy'      },
    ]
  }

}
