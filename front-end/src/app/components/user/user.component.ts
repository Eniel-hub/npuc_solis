import { User } from '../../interfaces/User';
import { Observable } from 'rxjs';
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
  name : string = '';
  student : Student = {};
  hasUser : boolean = false;
  @Input() toggleSignButton : string = '';

  constructor(private service : UserPublishedService) { }

  ngOnInit(): void {
    this.service.userSet.subscribe((userP : User) => {
      this.user = userP
      this.name = this.user.username || ''
      console.log(this.name)
      this.service.studentSet.subscribe((studentP : Student) => {
        this.student = studentP
        if(this.student.ID)
          this.name = this.student.lastname || ''
      })
    })

    //todo : get profile picture from database
  }

  click(){
    console.log(this.name)
  }

}
