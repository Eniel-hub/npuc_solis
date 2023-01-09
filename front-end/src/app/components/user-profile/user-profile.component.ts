import { Error } from 'src/app/interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { faEye, faEyeSlash} from  '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //todo: make the profile change works
  profile : any;
  eyeIcon = faEye;
  image : any = '';
  ID : number = 10000;
  password : string = '';
  password1 : string = '';
  password2 : string = '';
  eyeSlashIcon = faEyeSlash;
  errorMessage : string = '';
  isVisible : boolean = false;
  isEditing : boolean = false;
  error: Error = {valid:false};
  errorClass : string = 'nothing';
  successClass : string = 'nothing';
  passwordType : string = 'password';
  user : any = localStorage.getItem("userInfo");
  username : any = JSON.parse(this.user).username;
  modalRef : MdbModalRef<AlertComponent> | null = null;

  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  eye() {
    if (this.isVisible) return this.eyeIcon
    else return this.eyeSlashIcon
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password'
  }

  constructor(
    private service : UserService,
    private modalService: MdbModalService,
    ) {   }

  ngOnInit(): void {
  }

  change(){
    //todo: save profile picture

    if(this.password1)
      this.passwordChange()
  }


  edit(){
    this.isEditing = !this.isEditing;
    this.password1 = '';
    this.password2 = '';
    this.password = '';
  }


  passwordChange = () =>{
    this.error = {valid:false};
    this.checkErrors();

    if(this.error.valid)
      this.getErrorMessage();

    else {
      this.service.updatePassword(this.password, this.password1).subscribe((response : any) => {
        if(response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
        }
        else {
          this.openModal();
          this.edit();
        }
      });
    }
  }

  getErrorMessage () : void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch(this.error.type) {
      case 'empty field':
        this.errorMessage = 'Fill all the fields';
        break;
      case 'old password':
        this.errorMessage = 'You used your previous passworrd';
        break;
      case "passwords don't match":
        this.errorMessage = "Passwords don't match";
        break;
      case 'password lenght' :
        this.errorMessage = 'Password should be at least 8 characters long';
        break;
      case "wrong password":
        this.errorMessage = "You entered a Wrong Password";
        break;
      default:
        this.errorMessage = 'error';
    }
  }

  checkErrors(error?:string) :void {
    //password used
    if(error){
      this.error.valid = true;
      this.error.type = error;
    }
    if (!(this.password1 && this.password2)){
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.password1 != this.password2){
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

  openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data : {
        title : 'Register',
        body : 'Password Changed'
      }
    })
  }

}
