import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/interfaces/School';
import { Student } from 'src/app/interfaces/Student';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { Nationality } from 'src/app/interfaces/Nationality';
import { Religion } from 'src/app/interfaces/Religion';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css',
              '../registration/registration.component.css']
})
export class StudentProfileComponent implements OnInit {
  student : Student = {};
  review : boolean = true;
  schools : School[] = [];
  religions : Religion[] = [];
  nationalities : Nationality[] = [];
  BDay : any;

  menuItems = [
    { name : 'dashboard', link : '/student/dashboard'},
    { name : 'enrollment', link : '/student/enrollment'},
    { name : 'profile', link : '/user/profile'},
    { name : 'about', link : '/about'},
    { name : 'logout'},
  ]

  constructor(
    private service : StudentService,
    private schoolService : SchoolService,
    ) { }

  ngOnInit(): void {
    this.schoolService.getHomeComponent()
        .subscribe((response : any) => {
          this.schools = response.schools;
        });

    this.service.getStudentProfile()
        .subscribe((response:any) =>{
      this.student = response;

     let day = this.student.bday ? this.student.bday : '';
     this.BDay = day;
     this.BDay = this.BDay.split("T")[0];
    })

    this.service.getAllNations()
    .subscribe((arr:any) =>{
      this.nationalities = arr;
    })

    this.service.getAllReligions()
    .subscribe((arr:any) =>{
      this.religions = arr;
    })
  }

  removeTime (date = new Date()) {
    let d = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    console.log(d)
    return d;
  }

  getSchool(id? : number){
    if(!id)
      return [{school_name : ''}]
    return this.schools.filter(school => {
      return school.ID == id;
    })
  }

  studentNationality(){
    return this.nationalities.filter(nat => {
      return nat.ID == this.student.nationality_id;
    })[0].nationality
  }

  studentReligion(){
    return this.religions.filter(reli => {
      return reli.ID == this.student.religion_id;
    })[0].religion
  }

  showParent(parent : string){
    let show : boolean = false;
    switch (parent){
      case 'father':
        show = this.student.father?.pname? true : false
        break
      case 'mother':
        show = this.student.mother?.pname? true : false
        break
      case 'guardian':
        show = this.student.guardian?.pname? true : false
        break
    }
    return show;
  }

}
