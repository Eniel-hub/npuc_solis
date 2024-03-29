import { Error } from 'src/app/interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { UserPublishedService } from 'src/app/services/user-published.service';
import { User } from 'src/app/interfaces/User';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  //todo: make the profile change works
  eyeIcon = faEye;
  userItem: any = localStorage.getItem('userInfo');
  username: any = JSON.parse(this.userItem).username;
  img: any;
  password: string = '';
  password1: string = '';
  password2: string = '';
  eyeSlashIcon = faEyeSlash;
  errorMessage: string = '';
  isVisible: boolean = false;
  isEditing: boolean = false;
  error: Error = { valid: false };
  errorClass: string = 'nothing';
  successClass: string = 'nothing';
  passwordType: string = 'password';
  profileN: string = '../../../assets/imgs/pp-n.jpeg';
  profile: string = this.profileN;
  modalRef: MdbModalRef<AlertComponent> | null = null;
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  student: Student = {};
  subscription: any;
  show: string = 'display: hidden';
  user: User = {};
  userSubscription: any;
  studentSubscription: any;
  menuSubscription: any;
  menuItems: { name?: string; link?: string }[] = [];

  constructor(
    private studentService: StudentService,
    private modalService: MdbModalService,
    private publish: UserPublishedService,
    private GlobalStudent: GlobalStudent,
    private userService: UserService,
    private GlobalUser: GlobalUser,
    private MenuItems: MenuItems
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
    // this.GlobalUser.globalVarUserUpdate.subscribe((user) => {
    //   console.log('user changed in user-profile component');
    //   this.user = user;
    // });
    this.MenuItems.updateMenuItems(true, 'student');

    this.student = this.GlobalStudent.getGlobalVarStudent();
    this.user = this.GlobalUser.getGlobalVarUser();
    console.log('user in profile is', this.user);

    this.profile = this.user.profile_picture || this.profile;
    if (this.student.gender == 'Male' && this.profile == this.profileN)
      this.profile = '../../../assets/imgs/pp-g.jpeg';
    else if (this.student.gender == 'Female' && this.profile == this.profileN)
      this.profile = '../../../assets/imgs/pp-f.jpeg';

    window.scrollTo(0, 0);
  }

  eye() {
    if (this.isVisible) return this.eyeIcon;
    else return this.eyeSlashIcon;
  }

  eyeClick() {
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible ? 'text' : 'password';
  }

  selectFile(event: any) {
    // @ts-ignore: Object is possibly 'null'
    this.img = (event!.target as HTMLInputElement).files[0];
    //if not an image do nothing
    if (this.img.type.match('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile = reader.result as string;
      };
      reader.readAsDataURL(this.img);
    }
  }

  change() {
    //todo: save profile picture
    if (this.img) {
      this.imgChange();
    }

    if (this.password1) {
      this.passwordChange();
    }
  }

  edit() {
    this.isEditing = !this.isEditing;
    this.password1 = '';
    this.password2 = '';
    this.password = '';
    this.img = '';
    this.error = { valid: false, type: '' };
  }

  imgChange = () => {
    this.error = { valid: false };
    if (!this.img.type.match('image/')) {
      this.error.valid = true;
      this.error.type = 'not an image';
      this.getErrorMessage();
      return;
    }
    this.loaderRef = this.modalService.open(LoaderComponent, {
      data: {
        title: 'Change In Progress',
      },
      ignoreBackdropClick: true,
    });
    this.userService.saveProfilePicture(this.img).subscribe((response: any) => {
      if (response.error) {
        this.checkErrors(response.error);
        this.getErrorMessage();
        this.loaderRef?.close();
      } else {
        setTimeout(() => {
          this.userService.setProfilePicture(response.url);
          this.user.profile_picture = response.url;
          this.GlobalUser.updateGlobalVar(this.user);
          this.profile = this.user.profile_picture || this.profile;
          this.loaderRef?.close();
          this.openModal();
          this.edit();
        }, 2000);
      }
    });
  };

  passwordChange = () => {
    this.error = { valid: false };
    this.checkErrors();

    if (this.error.valid) this.getErrorMessage();
    else {
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data: {
          title: 'Change In Progress',
        },
        ignoreBackdropClick: true,
      });
      this.userService
        .updatePassword(this.password, this.password1)
        .subscribe((response: any) => {
          if (response.error) {
            this.checkErrors(response.error);
            this.getErrorMessage();
            this.loaderRef?.close();
          } else {
            setTimeout(() => {
              this.loaderRef?.close();
              this.openModal(true);
              this.edit();
            }, 2000);
          }
        });
    }
  };

  getErrorMessage(): void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch (this.error.type) {
      case 'empty field':
        this.errorMessage = 'Fill all the fields';
        break;
      case 'old password':
        this.errorMessage = 'You used your previous passworrd';
        break;
      case "passwords don't match":
        this.errorMessage = "Passwords don't match";
        break;
      case 'password lenght':
        this.errorMessage = 'Password should be at least 8 characters long';
        break;
      case 'wrong password':
        this.errorMessage = 'You entered a Wrong Password';
        break;
      default:
        this.errorMessage = 'error';
    }
  }

  checkErrors(error?: string): void {
    //password used
    if (error) {
      this.error.valid = true;
      this.error.type = error;
    }
    if (!(this.password && this.password1 && this.password2)) {
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.password1 != this.password2) {
      this.error.valid = true;
      this.error.type = "passwords don't match";
      return;
    }
    if (this.password1.length < 8) {
      this.error.valid = true;
      this.error.type = 'password lenght';
      return;
    }
  }

  openModal(isPassword?: boolean) {
    this.modalRef = this.modalService.open(AlertComponent, {
      data: {
        title: 'User Profile',
        body: isPassword ? 'Password Changed' : 'Profile Picture Changed',
      },
    });
  }
}
