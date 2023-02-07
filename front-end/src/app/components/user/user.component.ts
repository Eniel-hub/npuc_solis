import { User } from '../../interfaces/User';
import { Student } from '../../interfaces/Student';
import { globalStudent } from 'src/app/global.student';
import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPublishedService } from '../../services/user-published.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pp : any;
  user : User = {};
  userIcon = faUser;
  student : Student = {};
  hasUser : boolean = false;
  @Input() toggleSignButton : string = '';
  userInfo : any = localStorage.getItem("userInfo");
  name : any = JSON.parse(this.userInfo).username;
  profile : string = '../../../assets/imgs/pp-n.jpeg';
  globalStudent : Student = {};
  subscription : any;

  constructor(
    private GlobalStudent : globalStudent,
    private service : UserPublishedService
    ) { }

  ngOnInit (): void {
    this.service.studentSet.subscribe((studentP : Student) => {
      this.student = studentP;
      if(this.student.ID)
        this.name = this.student.lastname || '';
      if(this.student.gender == "Male")
        this.profile = '../../../assets/imgs/pp-g.jpeg'
      else if(this.student.gender == "Female")
        this.profile = '../../../assets/imgs/pp-f.jpeg'
    })
    //todo : get profile picture from database
    this.service.userSet.subscribe((userP : User) =>{
      this.user = userP;
      if(this.user.profile_picture)
        this.pp = this.user.profile_picture
    })

    this.globalStudent = this.GlobalStudent.getGlobalVarStudent();

    this.student = this.globalStudent;
    if(this.student.ID)
      this.name = this.student.lastname || '';
    if(this.student.gender == "Male")
      this.profile = '../../../assets/imgs/pp-g.jpeg'
    else if(this.student.gender == "Female")
      this.profile = '../../../assets/imgs/pp-f.jpeg'

    this.subscription = this.GlobalStudent.globalVarStudentUpdate.subscribe(
      student => this.selectedStudent(student));
    }

    selectedStudent(student: Student) {
      this.globalStudent = student;
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
