import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { faBars, faXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItems } from 'src/app/services/menu-items.service';
import { User } from 'src/app/interfaces/User';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/interfaces/Student';
import { Admin } from 'src/app/interfaces/Admin';
import { GlobalAdmin } from 'src/app/services/Global.admin.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ani = '';
  xIcon = '';
  Icon: any;
  LIcon: any;
  barIcon = faBars;
  userIcon = faUser;
  xmarkIcon = faXmark;
  homeLink: string = '/home';
  currentRouter: string = '';
  hasDropdown: boolean = false;
  menuIsActive: boolean = false;
  LmenuIsActive: boolean = false;
  menuClass = new BehaviorSubject('hide');
  LmenuClass = new BehaviorSubject('hide');
  @Input() menuItems: { name?: string; link?: string }[] = [];
  @Output() hasLoggedIn = new EventEmitter<boolean>();

  menuSubscription: any;
  userSubscription: any;
  adminSubscription: any;
  studentSubscription: any;

  user: User = {};
  admin: Admin = {};
  student: Student = {};

  constructor(
    private userService: UserService,
    private MenuItems: MenuItems,
    private globalUser: GlobalUser,
    private globalStudent: GlobalStudent,
    private globalAdmin: GlobalAdmin,
    private studentService: StudentService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.globalUser.getGlobalUser.subscribe((user) => {
      this.user = user;
      this.update();
    });
    this.menuSubscription = this.MenuItems.menuItemsUpdate.subscribe(
      (menuItems: any) => {
        this.menuItems = menuItems;
      }
    );
    this.userSubscription = this.globalUser.globalVarUserUpdate.subscribe(
      (user: User) => {
        this.user = user;
        console.log('inside userSubscription');
      }
    );
    this.studentSubscription =
      this.globalStudent.globalVarStudentUpdate.subscribe(
        (student: Student) => {
          this.student = student;
        }
      );
    // this.adminSubscription = this.globalAdmin.globalVarAdminUpdate.subscribe(
    //   (admin: Admin) => {
    //     this.admin = admin;
    //   }
    // );
  }

  ngOnInit(): void {
    this.userService.isAuth().subscribe((response: any) => {
      if (!response.isAuth) this.router.navigate(['/home']);
      else {
        this.userService.getUser().subscribe((response: any) => {
          if (response.error) return;

          let user = { ...response, type: 'student' };
          let glUser = this.globalUser.getGlobalVarUser();
          // this.userService.setUserInfo({ username: user.username });
          if (glUser != user) {
            this.globalUser.updateGlobalVar(user);
          }
          this.user = this.globalUser.getGlobalVarUser();

          this.studentService.getStudentProfile().subscribe((response: any) => {
            if (response.error) return;
            let student = response;
            console.log('response student', response);
            this.globalStudent.updateGlobalVar(student);
            this.student = this.globalStudent.getGlobalVarStudent();
          });

          this.homeLink = '/student/dashboard';
          this.hasDropdown = true;
          this.router.navigate([this.homeLink]);
        });

        // this.adminService.getUser().subscribe((response: any) => {
        //   if (response.error) return;

        //   this.homeLink = '/staff/dashboard';
        //   this.router.navigate([this.homeLink]);
        //   this.user = { ...response, type: 'admin' };
        //   this.globalAdmin.updateGlobalVar(response);
        //   this.admin = this.globalAdmin.getGlobalVarAdmin();
        //   this.hasDropdown = true;
        // });
      }
    });

    this.Icon = this.barIcon;
    this.LIcon = this.userIcon;
    this.menuSubscription;
    console.log(this.user);
  }

  update = () => {
    if (this.user.username) this.hasDropdown = true;
    else this.hasDropdown = false;
  };

  HasNav = (hasNav: boolean) => {
    if (hasNav) {
      this.menuIsActive = false;
      this.LmenuIsActive = false;
      this.Icon = this.barIcon;
      this.LIcon = this.userIcon;
    }
  };

  MenuToggle = () => {
    this.ani = this.menuIsActive ? 'ani2' : 'ani1';
    setTimeout(() => {
      this.ani = '';
    }, 1000);
    this.menuIsActive = !this.menuIsActive;
    setTimeout(() => {
      this.ani = this.ani + ' ani';
      this.Icon = this.menuIsActive ? this.xmarkIcon : this.barIcon;
    }, 333);
    if (this.menuIsActive) {
      this.xIcon = 'xIcon ';
      this.menuClass.next('_nav animate-right');
    } else {
      this.xIcon = '';
      this.menuClass.next('_nav animate-left');
    }
    if (!this.menuIsActive)
      setTimeout(() => {
        this.menuClass.next('_nav hide');
      }, 500);
  };

  UserToggle = () => {
    this.ani = this.LmenuIsActive ? 'ani4' : 'ani3';
    setTimeout(() => {
      this.ani = '';
    }, 1000);
    this.LmenuIsActive = !this.LmenuIsActive;
    setTimeout(() => {
      this.ani = this.ani + 'ani';
      this.LIcon = this.LmenuIsActive ? this.xmarkIcon : this.userIcon;
    }, 333);
    if (this.LmenuIsActive) {
      this.xIcon = 'xIcon ';
      this.LmenuClass.next('_nav2 _2animate-right');
    } else {
      this.xIcon = '';
      this.LmenuClass.next('_nav2 _2animate-left');
    }
    if (!this.LmenuIsActive)
      setTimeout(() => {
        this.LmenuClass.next('_nav2 _2hide');
      }, 500);
  };

  isAuth(): boolean {
    if (this.user) return true;
    return false;
  }
}
