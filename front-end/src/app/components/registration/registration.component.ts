import { StudentApplication } from '../../interfaces/StudentApplication';
import { StudentService } from './../../services/student.service';
import { SchoolService } from '../../services/school.service';
import { Nationality } from '../../interfaces/Nationality';
import { StudentCat } from '../../interfaces/StudentCat';
import { Religion } from '../../interfaces/Religion';
import { Student } from '../../interfaces/Student';
import { Component, OnInit } from '@angular/core';
import { School } from '../../interfaces/School';
import { Parent } from '../../interfaces/Parent';
import {
  faChevronLeft as arrLeft,
  faChevronRight as arrRight,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

//todo add error component
//todo add success component
//todo add loader component

export class RegistrationComponent implements OnInit {

  categories : string[] = ['School', 'Personal', 'Parents'];
  newStudentApplication : StudentApplication = {};
  guardian : Parent = {relationship : 'Guardian'};
  father : Parent = {relationship : 'Father'};
  mother : Parent = {relationship : 'Mother'};
  btn : string[] = ['btn dis', 'btn', 'btn'];
  section : string = this.categories[0];
  studentCategories : StudentCat[] = [];
  ArrLeftClass : string = 'not-active';
  guardian_entries : string = 'hidden';
  nationalities : Nationality[] = [];
  inputNation : string = 'hidden';
  parent : string = 'parent hide';
  category : string = 'Personal';
  idPersonal : string = 'active';
  personal : string = 'personal';
  religions : Religion[] = [];
  arrSchools : School[] = [];
  allValid : boolean = false;
  idEducation : string = '';
  isGuardian : string = '';
  newNation : string = '';
  schools : School[] = [];
  student : Student = {};
  grades: number[] = [];
  value : string = '';
  arrRight = arrRight;
  index : number = 0;
  count : number = 0;
  arrLeft = arrLeft;

  menuItems = [
    { name : 'logout',},
  ];


  constructor(
    private studentService : StudentService,
    private schoolService : SchoolService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.schoolService.getHomeComponent()
        .subscribe((response : any) => {
          this.arrSchools = response.schools;
          this.getSchools(this.arrSchools)
        });

    this.studentService.getAllNations().subscribe((arr:any) =>{
      this.nationalities = arr;
    })

    this.studentService.getAllReligions().subscribe((arr:any) =>{
      this.religions = arr;
    })

    this.studentService.getStudentCat().subscribe((arr:any) =>{
      this.studentCategories = arr;
    })
  }

  searchSchool(event : Event){
    this.value = (event.target as HTMLInputElement).value;
    let schools = this.arrSchools.filter(school => {
      return school.school_name?.toLowerCase().includes(this.value.toLowerCase())
    })
    this.getSchools(schools)
  }

  getSchools(schools : School[]){
    this.schools = schools;
  }

  inputSchool(value : number){
    this.student.school_id = value;
  }

  getSchool(id? : number){
    if(!id)
      return [{school_name : ''}]
    return this.schools.filter(school => {
      return school.ID == id;
    })
  }

  next(){
    this.allValid = this.checkValidity()
    if(!this.student.school_id || this.index == this.categories.length-1)
      this.index =-1;
    this.index++;
    this.section = this.categories[this.index];
    for (let i = 0; i<this.btn.length; i++) this.btn[i] = "btn";
    this.btn[this.index] = 'btn dis'
    window.scrollTo(0, 0);
  }

  previous(){
    this.allValid = this.checkValidity()
    if(!this.student.school_id)
      this.index = 1;
    if(this.index == 0)
      this.index = this.categories.length;
    this.index--;
    this.section = this.categories[this.index];
    for (let i = 0; i<this.btn.length; i++) this.btn[i] = "btn";
    this.btn[this.index] = 'btn dis'
    window.scrollTo(0, 0);
  }

  page(index : number){
    this.allValid = this.checkValidity()
    if(this.student.school_id){
      this.index = index;
      this.section = this.categories[this.index];
      for (let i = 0; i<this.btn.length; i++) this.btn[i] = "btn";
      this.btn[this.index] = 'btn dis'
      window.scrollTo(0, 0);
    }
    return;
  }

  checkValidity(){
    let trueSoFar : boolean = false;
    if( this.student.lastname && this.student.firstname &&
        this.student.gender && this.student.bday &&
        this.student.home_address && this.student.religion_id &&
        this.student.nationality_id && this.student.school_id /*&&
         this.student.student_cat_id && this.student.guardian*/ ){

      if(this.isGuardian) trueSoFar = true;
        if(this.isGuardian.match('Father')){
          this.student.Guardian = 'Father'

          if( !(this.father.mobile && this.father.firstname &&
                this.father.lastname &&  this.father.relationship &&
                this.father.email &&  this.father.home_address)
            ) trueSoFar = false;
        }
        if(trueSoFar && this.isGuardian.match('Mother')){
          if(this.isGuardian.match('Father'))
            this.student.Guardian = 'Father & Mother'
          else
            this.student.Guardian = 'Mother'

          if( !(this.mother.mobile && this.mother.firstname &&
                this.mother.lastname &&  this.mother.relationship &&
                this.mother.email &&  this.mother.home_address)
            ) trueSoFar = false;
        }
        if(trueSoFar && this.isGuardian.match('Guardian')){
          this.student.Guardian = 'Guardian'

          if( !(this.guardian.mobile && this.mother.firstname &&
                this.guardian.lastname &&  this.guardian.relationship &&
                this.guardian.email &&  this.guardian.home_address)
            ) trueSoFar = false;
        }
    }
    return trueSoFar;
  }

  submit(){

    this.student.student_cat_id = 'E'
    this.newStudentApplication = {... this.student}
    this.newStudentApplication.father = {... this.father}
    this.newStudentApplication.mother = {... this.mother}
    this.newStudentApplication.guardian = {... this.guardian}

    this.studentService.registerStudent(this.newStudentApplication).subscribe((response : any) =>{
      if(response.error){
        console.log(response.error)
        return
      }
      this.route.navigate(['/student/dashboard'])
    });
  }

}
