import { Route, Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Student } from '../../interfaces/Student';
import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPublishedService } from '../../services/user-published.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User = {};
  pp : Blob = new Blob();
  userIcon = faUser;
  student : Student = {};
  hasUser : boolean = false;
  @Input() toggleSignButton : string = '';
  userInfo : any = localStorage.getItem("userInfo");
  name : any = JSON.parse(this.userInfo).username;

  constructor(
    private service : UserPublishedService,
    private Route : Router
    ) { }

  ngOnInit(): void {
    this.service.studentSet.subscribe((studentP : Student) => {
      this.student = studentP
      if(this.student.ID)
        this.name = this.student.lastname || ''
    })

    //todo : get profile picture from database
  }

  click(){
    console.log(this.name)
  }
}
