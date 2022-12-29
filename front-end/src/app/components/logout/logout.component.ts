import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

//todo add error component
//todo add success component
//todo add loader component

export class LogoutComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<LogoutComponent>,
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
      this.modalRef.close();
      this.router.navigate(['/home']);
    });
  }
}
