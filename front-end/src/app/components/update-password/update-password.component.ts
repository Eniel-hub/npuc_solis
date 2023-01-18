import { Router} from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { faUser, faLock,
         faEye, faEyeSlash,
         faIdBadge } from  '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css',
              '../register/register.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  modalRef : MdbModalRef<AlertComponent> | null = null;
  menuItems = [
    { name : 'home',    link : '/home'        },
    { name : 'About',   link : '/about-us'    },
    { name : 'Login',   link : '/user/login'  },
    { name : 'Register',   link : '/user/register'  }

  ];
  passwordType : string = 'password';
  successClass : string = 'nothing';
  errorClass : string = 'nothing';
  error: Error = {valid:false};
  successMessage : string = '';
  isVisible : boolean = false;
  errorMessage : string = '';
  eyeSlashIcon = faEyeSlash;
  idIcon = faIdBadge;
  lockIcon = faLock;
  userIcon = faUser;
  user : User = {};
  eyeIcon = faEye;

  constructor(
    private modalService: MdbModalService,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() : void {
   }

   openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data : {
        title : 'Update Password',
        body : 'Password changed successfully'
      }
    })
  }

  eye() {
    if (this.isVisible) return this.eyeIcon;
    else return this.eyeSlashIcon;
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password';
  }

  getInput(num : number, event : Event) : void {
    if(num === 0) this.user.username = (event.target as HTMLInputElement).value;
    else if(num === 1) this.user.password = (event.target as HTMLInputElement).value;
    else if(num === 2) this.user.password2 = (event.target as HTMLInputElement).value;
  }

  checkErrors(error?:string) :void {
    //username taken
    if(error){
      this.error.valid = true;
      this.error.type = error;
    }
    if (!(this.user.password && this.user.password2 && this.user.username && this.user.student_id)){
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.user.password != this.user.password2){
      this.error.valid = true;
      this.error.type = "passwords don't match";
      return;
    }
    if (this.user.password.length < 8) {
      this.error.valid = true;
      this.error.type = 'password lenght';
      return;
    }
  }

  getErrorMessage () : void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch(this.error.type) {
      case 'username not found':
        this.errorMessage = "no account found with this username";
        break;
      case "id and username don't match":
        this.errorMessage = "the ID number and username don't match";
        break;
      case 'empty field':
        this.errorMessage = 'Fill all the required fields';
        break;
      case "passwords don't match":
        this.errorMessage = "Passwords don't match";
        break;
      case 'password lenght' :
        this.errorMessage = 'Password should be at least 8 characters long';
        break;
      default:
        this.errorMessage = 'error';
    }
  }

  successfulChange() : void{
    this.successMessage = 'Change in progress';
    this.successClass = 'success';
    this.errorClass = 'nothing';
    setTimeout( ()=>{
      this.successMessage = 'Change successful';
    }, 1000);
    setTimeout( ()=>{
      this.router.navigate(['user/login']);
    }, 2000);

    this.openModal()
  }

  Change(){
    this.error = {valid:false};
    this.checkErrors();

    if(this.error.valid)
      this.getErrorMessage();

    else {
      this.userService.forgetPassword(this.user).subscribe((response : any) => {
        if(response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
        }
        else {
          this.successfulChange();
        }
      });
    }
  }

}