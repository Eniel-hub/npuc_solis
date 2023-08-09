import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { cards } from '../../interfaces/cards';
import { User } from '../../interfaces/User';
import { Card } from '../../interfaces/Card';
import {
  faChevronLeft as arrLeft,
  faChevronRight as arrRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-staff',
  templateUrl: './dashboard-staff.component.html',
  styleUrls: ['./dashboard-staff.component.css'],
})
export class DashboardStaffComponent implements OnInit {
  user: User = {};
  arrLeft = arrLeft;
  index: number = 0;
  arrRight = arrRight;
  cards: Card[] = cards;
  student: Student = {};
  profilePicture: string = ';';
  card: Card = this.cards[0];
  len: number = this.cards.length;
  menuItems: { name?: string; link?: string }[] = [];
  userSubscription: any;
  menuSubscription: any;
  studentSubscription: any;

  constructor(private MenuItems: MenuItems, private GlobalUser: GlobalUser) {
    this.GlobalUser.getGlobalUser.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getFirstCard();

    this.user = this.GlobalUser.getGlobalVarUser();

    this.MenuItems.updateMenuItems(true, this.user.type);
    this.menuItems = this.MenuItems.getMenuItems();
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  getFirstCard = () => {
    this.index = Math.floor(Math.random() * this.len);
    this.card = this.cards[this.index];
  };

  next = () => {
    if (this.index >= this.len) this.index = -1;
    this.index++;
    this.card = this.cards[this.index];
    window.scrollTo(0, 0);
  };

  previous = () => {
    if (this.index <= 0) this.index = this.len;
    this.index--;
    this.card = this.cards[this.index];
    window.scrollTo(0, 0);
  };
}
