import { UserPublishedService } from '../../services/user-published.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { cards } from '../../interfaces/cards';
import { User } from '../../interfaces/User';
import { Card } from '../../interfaces/Card';
import { Router } from '@angular/router';
import {
  faChevronLeft as arrLeft,
  faChevronRight as arrRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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

  constructor(
    private studentService: StudentService,
    private publish: UserPublishedService,
    private GlobalStudent: GlobalStudent,
    private MenuItems: MenuItems,
    private GlobalUser: GlobalUser,
    private userService: UserService,
    private router: Router
  ) {
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
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
    window.scrollTo(0, 0);
    this.getFirstCard();

    this.student = this.GlobalStudent.getGlobalVarStudent();
    this.user = this.GlobalUser.getGlobalVarUser();

    this.MenuItems.updateMenuItems(true, 'student');
    this.menuItems = this.MenuItems.getMenuItems();
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );

    this.publish.emitUserChange(this.user);
    if (this.user.profile_picture) {
      this.profilePicture = this.user.profile_picture;
      this.userService.setProfilePicture(this.profilePicture);
    }
    if (!this.student) this.router.navigate(['/student/application']);
    this.publish.emitStudentChange(this.student);
    this.studentService.setStudentInfo(this.student.ID || 0);

    // this.userService.getUser().subscribe((response: any) => {
    //   if (response.error) {
    //     this.router.navigate(['/user/login']);
    //     return;
    //   }
    //   this.user = response;
    //   this.publish.emitUserChange(this.user);
    //   if (this.user.profile_picture) {
    //     this.profilePicture = this.user.profile_picture;
    //     this.userService.setProfilePicture(this.profilePicture);
    //   }
    // });

    // this.studentService.getStudentProfile().subscribe((response: any) => {
    //   if (response.error) {
    //     this.router.navigate(['/student/application']);
    //     return;
    //   }
    //   this.student = response;
    //   this.publish.emitStudentChange(this.student);
    //   this.studentService.setStudentInfo(this.student.ID || 0);

    //   this.selectedStudent(this.student);
    // });
  }

  selectedStudent(student: Student) {
    this.GlobalStudent.updateGlobalVar(student);
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
