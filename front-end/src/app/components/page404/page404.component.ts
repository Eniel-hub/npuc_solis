import { Component, OnInit } from '@angular/core';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css'],
})
export class Page404Component implements OnInit {
  user: any;
  imgSrc: string = '';
  homeLink: string = '/student/dashboard';
  home: string = 'dashboard';
  userSubscription: any;

  constructor(
    private userService: UserService,
    private menuItems: MenuItems,
    private globalUser: GlobalUser
  ) {
    this.userSubscription = this.globalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    this.user = this.globalUser.getGlobalVarUser();
    window.scrollTo(0, 0);
    this.imgSrc = '../../../assets/imgs/404-bg2.gif';
    this.getImgSrc();
    let auth = this.userService.isAuthenticated();
    if (!auth) {
      this.homeLink = '/home';
      this.home = 'home';
    }
    this.menuItems.updateMenuItems(auth.valueOf(), this.user.type);
  }

  getImgSrc(): void {
    setTimeout(() => {
      this.imgSrc = '../../../assets/imgs/404-bg.png';
    }, 5000);
  }
}
