import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})

export class PolicyComponent implements OnInit {
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
      { name : 'privacy policy',   link : '/policy'       },
    ]
  }
}
