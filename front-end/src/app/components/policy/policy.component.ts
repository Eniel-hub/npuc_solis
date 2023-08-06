import { Component, OnInit } from '@angular/core';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
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

  constructor(
    private userService: UserService,
    private menuItems: MenuItems,
    private globalUser: GlobalUser
  ) {}

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
