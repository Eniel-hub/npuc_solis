import { Component, OnInit } from '@angular/core';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  homeLink: string = '/student/dashboard';
  home: string = 'dashboard';
  user: any;
  student: any;
  userSubscription: any;
  studentSubscription: any;

  constructor(
    private userService: UserService,
    private menuItems: MenuItems,
    private globalUser: GlobalUser,
    private GlobalStudent: GlobalStudent
  ) {
    this.userSubscription = this.globalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
    this.studentSubscription =
      this.GlobalStudent.globalVarStudentUpdate.subscribe((student) => {
        this.student = student;
      });
  }

  ngOnInit(): void {
    this.user = this.globalUser.getGlobalVarUser;
    window.scrollTo(0, 0);
    let auth = this.userService.isAuthenticated();
    if (!auth) {
      this.homeLink = '/home';
      this.home = 'home';
    }
    this.menuItems.updateMenuItems(auth.valueOf(), this.user.type);
  }
}
