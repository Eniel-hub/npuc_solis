import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faUser, faLock, faEye, faEyeSlash} from  '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  eyeIcon = faEye;
  user : User = {};
  userIcon = faUser;
  lockIcon = faLock;
  name : string = '';
  errorClass : string = '';
  eyeSlashIcon = faEyeSlash;
  errorMessage : string = '';
  successClass : string = '';
  isVisible : boolean = false;
  successMessage : string = '';
  infoClasses : string = 'info';
  error : Error = {valid : false};
  passwordType : string = 'password';
  menuItems = [
    { name : 'Home',       link : '/home'          },
    { name : 'About',      link : '/about-us'      },
    { name : 'Register',   link : '/user/register'  }
  ]

  constructor(
    private userService : UserService,
    private router : Router
    ) { }

  ngOnInit(): void { }

  eye() {
    if (this.isVisible) return this.eyeIcon
    else return this.eyeSlashIcon
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password'
  }

  getInput(num : number, event : Event) : void {
    if(num === 0) this.user.username = (event.target as HTMLInputElement).value;
    else if(num === 1) this.user.password = (event.target as HTMLInputElement).value;
  }

  checkErrors(error?:string) :void {
    if(error){
      this.error.valid = true;
      this.error.type = error; //wrong password or username not found in database
    }
    if (!(this.user.password && this.user.username)){
      this.error.valid = true;
      this.error.type = 'empty field';
      return;
    }
    if (this.user.password.length < 8) {
      this.error.valid = true;
      this.error.type = 'wrong password';
      return;
    }
    if (!this.user.username.match(/^[0-9a-z]+$/i)){
      this.error.valid = true;
      this.error.type = 'username not found';
      return;
    }
  }

  getErrorMessage(): void {
    this.errorClass = 'error';
    this.successClass = 'nothing';
    switch(this.error.type) {
      case 'empty field':
        this.errorMessage = 'Fill-up all the fields';
        break;
      case 'username not found':
        this.errorMessage = 'No account found with this username';
        break;
      case "wrong password":
        this.errorMessage = "You entered a Wrong Password";
        break;
      default:
        this.errorMessage = 'error'
    }
  }

  successfulLogin() : void {
    this.successMessage = 'Login in progress';
    this.successClass = 'success';
    this.errorClass = 'nothing';
    setTimeout( ()=>{
      this.successMessage = 'Login successful';
    }, 1000);
    setTimeout( ()=>{
      this.router.navigate(['student']);
    }, 2000);
  }

  login () : void {

    this.error = {valid:false};
    this.checkErrors();

    if(this.error.valid)
      this.getErrorMessage();

    else {
      this.userService.validate(this.user).subscribe((response : any) => {
        if(response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
        }
        else {
          this.successfulLogin();
        }
      });
    }
  }

}
