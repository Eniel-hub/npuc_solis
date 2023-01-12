import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { globalStudent } from 'src/app/global.student';
import { UserService } from 'src/app/services/user.service';

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
    public GlobalStudent : globalStudent,
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

      this.removeStudent();
      this.modalRef.close();
      this.router.navigate(['/home']);
    });
  }

  removeStudent(){
    this.GlobalStudent.updateGlobalVar({});
  }
}
