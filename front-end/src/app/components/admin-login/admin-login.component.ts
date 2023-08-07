import { Router } from '@angular/router';
import { Admin } from '../../interfaces/Admin';
import { Error } from '../../interfaces/Error';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItems } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: [
    '../register/register.component.css',
    './admin-login.component.css',
  ],
})
export class AdminLoginComponent implements OnInit {
  user: any;
  eyeIcon = faEye;
  admin: Admin = {};
  userIcon = faUser;
  lockIcon = faLock;
  name: string = '';
  userSubscription: any;
  errorClass: string = '';
  eyeSlashIcon = faEyeSlash;
  errorMessage: string = '';
  successClass: string = '';
  isVisible: boolean = false;
  successMessage: string = '';
  infoClasses: string = 'info';
  error: Error = { valid: false };
  passwordType: string = 'password';
  loaderRef: MdbModalRef<LoaderComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private GlobalUser: GlobalUser,
    private menuItems: MenuItems,
    private router: Router
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
    if (num === 0) this.admin.ID = value;
    else if (num === 1) this.admin.password = value;
  }

  checkErrors(error?: string): void {
    if (error) {
      this.error.valid = true;
      this.error.type = error; //wrong password or ID not found in database
    }
    if (!(this.admin.password && this.admin.ID)) {
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.admin.password.length < 8) {
      this.error.valid = true;
      this.error.type = 'wrong password';
      return;
    }
    if (!this.admin.ID.match(/^[0-9a-z]+$/i)) {
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

  successfulLogin(): void {
    this.successMessage = '';
    setTimeout(() => {
      this.router.navigate(['/admin/dashboard']);
      this.loaderRef?.close();
    }, 2000);

    //loging out after session expires
    setTimeout(() => {
      this.adminService.logOut();
      this.router.navigate(['/home']);
    }, 1000 * 60 * 60 * 5); //ms*s*min*hours 5hours
  }

  login(): void {
    this.error = { valid: false };
    this.checkErrors();

    if (this.error.valid) this.getErrorMessage();
    else {
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data: {
          title: 'Login In Progress',
        },
        ignoreBackdropClick: true,
      });
      this.adminService.validate(this.admin).subscribe((response: any) => {
        if (response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
          this.loaderRef?.close();
        } else {
          this.adminService.setUserInfo({
            ID: response.ID,
            type: response.type,
          });
          this.successfulLogin();
        }
      });
    }
  }
}
