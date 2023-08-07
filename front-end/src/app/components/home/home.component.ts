import { SchoolService } from '../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { School } from '../../interfaces/School';
import { MenuItems } from 'src/app/services/menu-items.service';
import { GlobalUser } from 'src/app/services/Global.user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeComponents: any;
  schools: School[] = [];
  nextSchoolYear: string = '';
  currentSchoolYear: string = '';
  menuSubscription: any;
  userSubscription: any;
  user: any;

  constructor(
    private service: SchoolService,
    private GlobalUser: GlobalUser,
    private MenuItems: MenuItems
  ) {
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.MenuItems.updateMenuItems(false);

    this.service.getHomeComponent().subscribe((response) => {
      this.homeComponents = response;
      this.schools = this.homeComponents.schools;
      this.currentSchoolYear = this.homeComponents.current_year.school_year;
      this.nextSchoolYear = this.homeComponents.next_year.school_year;
    });
  }
}
