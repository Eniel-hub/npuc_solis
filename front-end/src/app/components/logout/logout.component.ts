import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  menuItems = [
    { name : 'Dashboard',      link : '/student/dashboard'  }
  ]

  constructor(
    private userService : UserService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  logOut = () =>{
    this.userService.logOut()
    this.router.navigate(['/home']);

    // setTimeout( ()=>{
    //   this.router.navigate(['/home']);
    // }, 1000);
  }

}
