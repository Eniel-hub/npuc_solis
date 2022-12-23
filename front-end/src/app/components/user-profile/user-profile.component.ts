import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash} from  '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //todo: make the profile change works
  profile : any;
  image : any = '';
  username : string = 'Enielleba';
  ID : number = 10000;
  isEditing : boolean = false;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  isVisible : boolean = false;
  passwordType : string = 'password';

  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'about', link : '/about'},
    { name : 'logout', link : '/user/logout'},
  ]

  eye() {
    if (this.isVisible) return this.eyeIcon
    else return this.eyeSlashIcon
  }

  eyeClick(){
    this.isVisible = !this.isVisible;
    this.passwordType = this.isVisible? 'text' : 'password'
  }

  constructor() {   }

  ngOnInit(): void {
  }

  change(){
    //todo: save changes
    this.isEditing = !this.isEditing;
  }

}
