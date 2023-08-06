import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalUser } from 'src/app/services/Global.user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<LogoutComponent>,
    public GlobalStudent: GlobalStudent,
    private globalUser: GlobalUser,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logOut = () => {
    this.userService.logOut().subscribe((response: any) => {
      if (response.error) {
        console.log('error while loging out');
        return;
      }

      this.globalUser.updateGlobalVar({});

      this.removeStudent();
      this.modalRef.close();
      this.router.navigate(['/home']);
    });
  };

  removeStudent() {
    this.GlobalStudent.updateGlobalVar({});
  }
}
