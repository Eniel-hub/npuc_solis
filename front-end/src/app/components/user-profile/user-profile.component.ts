import { Error } from 'src/app/interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { globalStudent } from 'src/app/global.student';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
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
  ID : any;
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
  image : string = '../../../assets/imgs/pp-n.jpeg';
  modalRef : MdbModalRef<AlertComponent> | null = null;
  loaderRef : MdbModalRef<LoaderComponent> | null = null;
  globalStudent : Student = {};
  subscription : any;

  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'student', link : '/student/profile'},
    { name : 'about', link : '/about-us'},
    { name : 'logout'},
  ]

  constructor(
    private GlobalStudent : globalStudent,
    private service : UserService,
    private modalService: MdbModalService,
    ) {   }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.globalStudent = this.GlobalStudent.getGlobalVarStudent();
    this.ID = this.globalStudent.ID;

    if(this.globalStudent.gender == "Male")
      this.image = '../../../assets/imgs/pp-g.jpeg'
    else if(this.globalStudent.gender == "Female")
      this.image = '../../../assets/imgs/pp-f.jpeg'
  }

  eye() {
    if (this.isVisible) return this.eyeIcon
    else return this.eyeSlashIcon
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password'
  }

  selectFile(event: any) {
    // @ts-ignore: Object is possibly 'null'
    const file = (event!.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  change(){
    //todo: save profile picture

    if(this.password1){
      this.passwordChange()

      }
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
      this.loaderRef = this.modalService.open(LoaderComponent, {
        data : {
          title : 'Change In Progress'
        },
        ignoreBackdropClick : true
      })
      this.service.updatePassword(this.password, this.password1).subscribe((response : any) => {
        if(response.error) {
          this.checkErrors(response.error);
          this.getErrorMessage();
          this.loaderRef?.close()
        }
        else {
          setTimeout( ()=>{
            this.loaderRef?.close()
            this.openModal();
            this.edit();
          }, 2000);
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
