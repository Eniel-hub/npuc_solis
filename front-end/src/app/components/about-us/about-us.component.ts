import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserPublishedService } from 'src/app/services/user-published.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { User } from 'src/app/interfaces/User';
import { MenuItems } from 'src/app/services/menu-items.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  userSubscription: any;
  homeLink: string = '/student/dashboard';
  user: User = {};
  home: string = 'dashboard';
  imgSrc: string = '../../../assets/imgs/1.jpg';
  studentSubscription: any;
  student: any;

  constructor(
    private userService: UserService,
    private globalUser: GlobalUser,
    private menuItems: MenuItems,
    private GlobalStudent: GlobalStudent
  ) {
    this.userSubscription = this.globalUser.globalVarUserUpdate.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.studentSubscription =
      this.GlobalStudent.globalVarStudentUpdate.subscribe((student) => {
        this.student = student;
      });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (!this.isAuth()) {
      this.homeLink = '/home';
      this.home = 'home';
    }
    this.menuItems.updateMenuItems(this.isAuth(), this.user.type);
  }

  isAuth(): boolean {
    if (this.user) return true;
    return false;
  }
}
