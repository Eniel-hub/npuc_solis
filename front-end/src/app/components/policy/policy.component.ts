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
  home: string = 'dashboard';
  user: any;
  student: any;
  userSubscription: any;
  studentSubscription: any;
  date = '8/12/2023';
  email_address = 'email address';

  constructor(
    private userService: UserService,
    private menuItems: MenuItems,
    private globalUser: GlobalUser,
    private GlobalStudent: GlobalStudent
  ) {
    this.globalUser.getGlobalUser.subscribe((user) => {
      this.user = user;
      this.update();
    });
    this.studentSubscription =
      this.GlobalStudent.globalVarStudentUpdate.subscribe((student) => {
        this.student = student;
      });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.menuItems.updateMenuItems(this.user ? true : false, this.user?.type);
  }

  update() {
    this.menuItems.updateMenuItems(this.user ? true : false, this.user.type);
  }
}
