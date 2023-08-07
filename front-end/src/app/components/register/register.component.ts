import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItems } from 'src/app/services/menu-items.service';
import { GlobalUser } from 'src/app/services/Global.user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

//todo add error component
//todo add success component
//todo add loader component
export class RegisterComponent implements OnInit {
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  modalRef: MdbModalRef<AlertComponent> | null = null;
  passwordType: string = 'password';
  successClass: string = 'nothing';
  errorClass: string = 'nothing';
  error: Error = { valid: false };
  successMessage: string = '';
  isVisible: boolean = false;
  errorMessage: string = '';
  eyeSlashIcon = faEyeSlash;
  idIcon = faIdBadge;
  lockIcon = faLock;
  userIcon = faUser;
  user: User = {};
  userSubscription: any;
  eyeIcon = faEye;

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private router: Router,
    private GlobalUser: GlobalUser,
    private menuItems: MenuItems
  ) {
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.menuItems.updateMenuItems(false);
  }

  openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data: {
        title: 'Register',
        body: 'Suceessfully registered please login',
      },
    });
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
    if (num === 0)
      this.user.username = (event.target as HTMLInputElement).value;
    else if (num === 1)
      this.user.password = (event.target as HTMLInputElement).value;
    else if (num === 2)
      this.user.password2 = (event.target as HTMLInputElement).value;
  }

  checkErrors(error?: string): void {
    //username taken
    if (error) {
      this.error.valid = true;
      this.error.type = error;
    }
    if (!(this.user.password && this.user.password2 && this.user.username)) {
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.user.password != this.user.password2) {
      this.error.valid = true;
      this.error.type = "passwords don't match";
      return;
    }
    if (this.user.password.length < 8) {
      this.error.valid = true;
      this.error.type = 'password lenght';
      return;
    }
    if (!this.user.username.match(/^[0-9a-z]+$/i)) {
      this.error.valid = true;
      this.error.type = 'username not alphanumeric';
      return;
    }
    if (this.user.username.length > 'averylongusername'.length) {
      this.error.valid = true;
      this.error.type = 'username too long';
      return;
    }
  }

  getErrorMessage(): void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch (this.error.type) {
      case 'id not found':
        this.errorMessage = 'The ID Number was not found';
        break;
      case 'ID taken':
        this.errorMessage = 'An Account is already link to this ID';
        break;
      case 'empty field':
        this.errorMessage = 'Fill all the required fields';
        break;
      case 'username not alphanumeric':
        this.errorMessage =
          'You can only use letter and numbers for your username';
        break;
      case 'username too long':
        this.errorMessage = 'Your username should be shorter';
        break;
      case 'username taken':
        this.errorMessage = 'This Username is already taken';
        break;
      case "passwords don't match":
        this.errorMessage = "Passwords don't match";
        break;
      case 'password lenght':
        this.errorMessage = 'Password should be at least 8 characters long';
        break;
      default:
        this.errorMessage = 'error';
    }
  }

  successefulRegistration(): void {
    setTimeout(() => {
      this.loaderRef?.close();
      this.openModal();
    }, 2000);
    setTimeout(() => {
      this.router.navigate(['user/login']);
    }, 2500);
  }

  Registration() {
    this.error = { valid: false };
    this.checkErrors();

    if (this.error.valid) this.getErrorMessage();
    else {
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data: {
          title: 'Register In Progress',
        },
        ignoreBackdropClick: true,
      });
      if (!this.user.student_id) this.user.student_id = 0;
      this.userService.saveUser(this.user).subscribe((response: any) => {
        if (response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
          this.loaderRef?.close;
        } else {
          this.successefulRegistration();
        }
      });
    }
  }
}
