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
    { name : 'Dashboard',   link : '/student/dashboard'  },
    { name : 'Profile',     link : 'user/profile'}
  ]

  constructor(
    private userService : UserService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  logOut = () =>{

    this.userService.logOut()
    .subscribe((response : any) => {
      if(response.error){
        console.log('error while loging out')
        return
      }
      this.router.navigate(['/home']);
    });

      //todo: delete cookies from front-end side

    // setTimeout( ()=>{
    //   this.router.navigate(['/home']);
    // }, 1000);
  }

}
