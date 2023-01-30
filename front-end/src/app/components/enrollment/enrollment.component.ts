import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { RegistrationService } from './../../services/registration.service';
import { MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import { StudentService } from 'src/app/services/student.service';
import { SchoolService } from 'src/app/services/school.service';
import { LoaderComponent } from '../loader/loader.component';
import { globalStudent } from 'src/app/global.student';
import { Student } from 'src/app/interfaces/Student';
import { School } from 'src/app/interfaces/School';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'src/app/services/confirmation.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css',
              '../registration/registration.component.css']
})
export class EnrollmentComponent implements OnInit {
  modalRef : MdbModalRef<ConfirmationComponent> | null = null;
  loaderRef : MdbModalRef<LoaderComponent> | null = null;
  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'student', link : '/student/profile'},
    { name : 'profile', link : '/user/profile'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  record : any;
  gradeLevelId = 0;
  grade = '4.0 GPA';
  currentSchYear : any;
  student : Student = {};
  enrollmentSchYear : any;
  schools : School[] = [];
  gradeLevel : string = '';
  nxtGradeLevel : string = '';
  isEnrolled : boolean = false;
  enrollment : boolean = false;
  currentSection : string = '';
  isConfirmed : boolean = false;

  constructor(
    private route : Router,
    private service : StudentService,
    private schoolService : SchoolService,
    private globalStudent : globalStudent,
    private modalService: MdbModalService,
    private regiService : RegistrationService,
    private confirmPublished : ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.regiService.checkRegistration()
        .subscribe((response:any)=>{
          if(response.notExist)
            this.isEnrolled = false;
          else{
            this.isEnrolled = true;
            this.record = response;
          }
        })

    this.schoolService.getHomeComponent()
        .subscribe((response : any) => {
          this.schools = response.schools;
          this.currentSchYear = response.current_year;
          this.enrollmentSchYear = response.next_year;
        });

    this.student = this.globalStudent.getGlobalVarStudent()

    this.service.getGradeLevel()
      .subscribe((response:any) =>{
      if(response.error)
        console.log(response.error);
      else{
        this.gradeLevel = response.grade_level;
        this.gradeLevelId = response.ID;
      }
    });

    this.regiService.getCurrentRegistration()
      .subscribe((response : any) =>{
        if(response.error)
          console.log(response.error);
        else{
          this.currentSection = response.section_name;
        }
    })
    setTimeout(() => {
      this.regiService.getNextRegistration(this.gradeLevelId)
        .subscribe((response : any) =>{
          if(response.error)
            console.log(response.error)
          else{
            this.nxtGradeLevel = response.grade_level.grade_level;
          }
        })
    }, 100);
  }

  decision(grade : string){
  // this.nxtGgradeLevel =
    return 'PASSED'
  }

  getSchool(id? : number){
    if(!id)
      return [{school_name : ''}]
    return this.schools.filter(school => {
      return school.ID == id;
    })
  }

  next(){
    window.scrollTo(0, 0);
    this.enrollment = !this.enrollment;
  }

  openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data : {
        title : 'Enrollment',
        body : 'Enrollment Successfull'
      }
    })
  }

  confirm(){
    this.modalRef = this.modalService.open(ConfirmationComponent, {
      data : {
        title : 'Enrollment',
        confirmation : 'Do you want to proceed with your enrollment?'
      }
    })

    this.modalRef.onClose.subscribe(() =>{
      this.isConfirmed = this.confirmPublished.getGlobalVarStudent();
      if(this.isConfirmed){
        this.loaderRef = this.modalService.open(LoaderComponent, {
          data : {
            title : 'Enrollment In Progress'
          },
          ignoreBackdropClick : true
        })
        this.regiService.setNextRegistration(this.nxtGradeLevel, this.enrollmentSchYear.ID)
          .subscribe((response :any) =>{
            if(response.error){
              this.loaderRef?.close()
              console.log(response.error)
            }
            if(response.success){
              setTimeout(() => {
                this.loaderRef?.close()
                this.openModal();
              }, 2000);
              setTimeout( ()=>{
                this.route.navigate(['/student/dashboard']);
              }, 2500);

            }
        })
      }
    })
  }

}
