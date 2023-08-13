import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { AdminService } from 'src/app/services/admin.service';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-dashboard-staff',
  templateUrl: './dashboard-staff.component.html',
  styleUrls: [
    '../dashboard/dashboard.component.css',
    './dashboard-staff.component.css',
  ],
})
export class DashboardStaffComponent implements OnInit {
  school: any;
  user: User = {};
  index: number = 0;
  student: Student = {};
  profilePicture: string = ';';
  menuItems: { name?: string; link?: string }[] = [];
  userSubscription: any;
  menuSubscription: any;
  studentSubscription: any;

  constructor(
    private MenuItems: MenuItems,
    private GlobalUser: GlobalUser,
    private AdminService: AdminService
  ) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.user = this.GlobalUser.getGlobalVarUser();

    this.MenuItems.updateMenuItems(true, this.user.type);
    this.menuItems = this.MenuItems.getMenuItems();
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
    this.AdminService.getSchool(this.user).subscribe((school) => {
      this.school = school;
    });
  }

  getImage(name: string) {
    //todo: get iamges from database

    return '../../../assets/imgs/2.jpg';
  }
}
