import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { Student } from 'src/app/interfaces/Student';
import { MenuItems } from 'src/app/services/menu-items.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css', './login.component.css'],
})

//
export class LoginComponent implements OnInit {
  @Output() hasLoggedIn = new EventEmitter<boolean>();
  eyeIcon = faEye;
  user: User = { type: 'student' };
  userIcon = faUser;
  lockIcon = faLock;
  name: string = '';
  student: Student = {};
  errorClass: string = '';
  eyeSlashIcon = faEyeSlash;
  errorMessage: string = '';
  successClass: string = '';
  isVisible: boolean = false;
  successMessage: string = '';
  infoClasses: string = 'info';
  error: Error = {
    valid: false,
  };
  passwordType: string = 'password';
  menuItems: {
    name?: string;
    link?: string;
  }[] = [];
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  studentSubscription: any;
  userSubscription: any;
  menuSubscription: any;

  constructor(
    private studentService: StudentService,
    private modalService: MdbModalService,
    private GlobalStudent: GlobalStudent,
    private userService: UserService,
    private GlobalUser: GlobalUser,
    private MenuItems: MenuItems,
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

    this.MenuItems.updateMenuItems(false);
  }

  eye() {
    if (this.isVisible) return this.eyeIcon;
    else return this.eyeSlashIcon;
  }

  eyeClick() {
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible ? 'text' : 'password';
  }

  getInput(num: number, event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if (num === 0) this.user.username = value;
    else if (num === 1) this.user.password = value;
  }

  checkErrors(error?: string): void {
    if (error) {
      this.error.valid = true;
      this.error.type = error; // wrong password or username not found in database
    }
    if (!(this.user.password && this.user.username)) {
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.user.password.length < 8) {
      this.error.valid = true;
      this.error.type = 'wrong password';
      return;
    }
    if (!this.user.username.match(/^[0-9a-z]+$/i)) {
      this.error.valid = true;
      this.error.type = 'username not found';
      return;
    }
  }

  getErrorMessage(): void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch (this.error.type) {
      case 'empty field':
        this.errorMessage = 'Fill-up all the fields';
        break;
      case 'username not found':
        this.errorMessage = 'No account found with this username or ID';
        break;
      case 'wrong password':
        this.errorMessage = 'You entered a Wrong Password';
        break;
      default:
        this.errorMessage = 'error';
    }
  }

  successfulLogin(user: User): void {
    this.successMessage = '';

    setTimeout(() => {
      this.router.navigate(['/student/dashboard']);
      this.loaderRef?.close();
      this.GlobalUser.updateGlobalVar(user);
      this.user = this.GlobalUser.getGlobalVarUser();

      this.studentService.getStudentProfile().subscribe((response: any) => {
        if (response.error) {
          return;
        }
        let student = response;
        this.GlobalStudent.updateGlobalVar(student);
        this.student = this.GlobalStudent.getGlobalVarStudent();
      });
    }, 1500);

    // loging out after session expires
    setTimeout(() => {
      this.userService.logOut();
      this.router.navigate(['/home']);
    }, 1000 * 60 * 60 * 5); // ms*s*min*hours 5hours
  }

  login(): void {
    this.error = {
      valid: false,
    };
    this.checkErrors();

    if (this.error.valid) this.getErrorMessage();
    else {
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data: {
          title: 'Login In Progress',
        },
        ignoreBackdropClick: true,
      });
      this.userService.validate(this.user).subscribe((response: any) => {
        if (response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
          this.loaderRef?.close();
        } else {
          let user = { ...response, type: 'student' };
          this.userService.setUserInfo({ username: user.username });
          this.successfulLogin(user);
        }
      });
    }
  }
}
