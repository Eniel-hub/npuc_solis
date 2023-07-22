import { User } from '../../interfaces/User';
import { Admin } from 'src/app/interfaces/Admin';
import { Student } from '../../interfaces/Student';
import { GlobalAdmin } from 'src/app/services/Global.admin.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';
import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPublishedService } from '../../services/user-published.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  pp: any;
  user: User = {};
  userIcon = faUser;
  student: Student = {};
  admin: Admin = {};
  hasUser: boolean = false;
  @Input() toggleSignButton: string = '';
  userInfo: any = localStorage.getItem('userInfo');
  name: any = JSON.parse(this.userInfo).username;
  profileN: string = '../../../assets/imgs/pp-n.jpeg';
  profile: string = this.profileN;
  globalProfilePicture: string = '';
  studentSubscription: any;
  adminSubscription: any;
  userSubscription: any;

  constructor(
    private GlobalUser: GlobalUser,
    private GlobalAdmin: GlobalAdmin,
    private GlobalStudent: GlobalStudent,
    private studentService: StudentService,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
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
    this.userService.isAuth().subscribe((response: any) => {
      if (!response.isAuth) this.router.navigate(['/home']);
    });
    this.userService.getUser().subscribe((response: any) => {
      if (response.error) return;

      let user = { ...response, type: 'student' };
      this.GlobalUser.updateGlobalVar(user);
      this.user = this.GlobalUser.getGlobalVarUser();
    });
    this.adminService.getUser().subscribe((response: any) => {
      if (response.error) return;

      let admin = { ...response, type: 'admin' };
      this.GlobalAdmin.updateGlobalVar(admin);
      this.admin = this.GlobalAdmin.getGlobalVarAdmin();
    });
    this.studentService.getStudentProfile().subscribe((response: any) => {
      if (response.error) {
        return;
      }
      let student = response;
      this.GlobalStudent.updateGlobalVar(student);
      this.student = this.GlobalStudent.getGlobalVarStudent();
      this.name = this.student.lastname || '';

      if (this.student.gender == 'Male' && this.profile == this.profileN)
        this.profile = '../../../assets/imgs/pp-g.jpeg';
      else if (this.student.gender == 'Female' && this.profile == this.profileN)
        this.profile = '../../../assets/imgs/pp-f.jpeg';
    });

    // getting picture
    this.profile = this.user.profile_picture || this.profile;
  }

  ngOnDestroy() {
    this.studentSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }
}
