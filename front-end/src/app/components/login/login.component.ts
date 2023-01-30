import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import { faUser, faLock, faEye, faEyeSlash} from  '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css',
              './login.component.css']
})

//todo add error component
//todo add loader component

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
  loaderRef : MdbModalRef<LoaderComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private userService : UserService,
    private router : Router
    ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   }

  eye() {
    if (this.isVisible) return this.eyeIcon
    else return this.eyeSlashIcon
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password'
  }

  getInput(num : number, event : Event) : void {
    let value = (event.target as HTMLInputElement).value;
    if(num === 0) this.user.username = value
    else if(num === 1) this.user.password = value;
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
        this.errorMessage = 'No account found with this username or ID';
        break;
      case "wrong password":
        this.errorMessage = "You entered a Wrong Password";
        break;
      default:
        this.errorMessage = 'error'
    }
  }

  successfulLogin() : void {
    this.successMessage = '';
    setTimeout( ()=>{
      this.router.navigate(['/student/dashboard']);
      this.loaderRef?.close()
    }, 2000);
  }

  login () : void {

    this.error = {valid:false};
    this.checkErrors();

    if(this.error.valid)
      this.getErrorMessage();

    else {
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data : {
          title : 'Login In Progress'
        },
        ignoreBackdropClick : true
      })
      this.userService.validate(this.user).subscribe((response : any) => {
        if(response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
          this.loaderRef?.close()
        }
        else {
          this.userService.setUserInfo({username : response});
          this.successfulLogin();
        }
      });
    }
  }

}
