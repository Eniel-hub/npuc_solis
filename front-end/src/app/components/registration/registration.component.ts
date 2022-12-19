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


export class RegistrationComponent implements OnInit {

  categories : string[] = ['School', 'Personal', 'Parents'];
  student : Student = {nationality_id:100, religion_id:100};
  newStudentApplication : StudentApplication = {};
  btn : string[] = ['btn dis', 'btn', 'btn'];
  section : string = this.categories[0];
  studentCategories : StudentCat[] = [];
  ArrLeftClass : string = 'not-active';
  guardian_entries : string = 'hidden';
  nationalities : Nationality[] = [];
  guardian : Parent = {parent : 'G'};
  father : Parent = {parent : 'F'};
  mother : Parent = {parent : 'M'};
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
  grades: number[] = [];
  value : string = '';
  arrRight = arrRight;
  index : number = 0;
  count : number = 0;
  arrLeft = arrLeft;

  menuItems = [
    { name : 'personal',    link : '/student/application#personal'     },
    { name : 'parents',     link : '/student/application#parents'      },
    { name : 'education',   link : '/student/application#education'    },
    { name : 'logout',      link : '/user/logout'  },
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
    let trueSoFar : boolean = true;
    // let trueSoFar : boolean = false;
    // if( this.student.lastname && this.student.firstname &&
    //     this.student.gender && this.student.bday &&
    //     this.student.home_address && this.student.religion_id &&
    //     this.student.nationality_id && this.student.school_id /*&&
    //      this.student.student_cat_id && this.student.guardian*/ ){

    //   if(this.isGuardian) trueSoFar = true;
    //     if(this.isGuardian.match('Father')){
    //       if( !(this.father.mobile && this.father.firstname &&
    //             this.father.lastname &&  this.father.parent &&
    //             this.father.email &&  this.father.home_address)
    //         ) trueSoFar = false;
    //     }
    //     if(trueSoFar && this.isGuardian.match('Mother')){
    //       if( !(this.mother.mobile && this.mother.firstname &&
    //             this.mother.lastname &&  this.mother.parent &&
    //             this.mother.email &&  this.mother.home_address)
    //         ) trueSoFar = false;
    //     }
    //     if(trueSoFar && this.isGuardian.match('Guardian')){
    //       if( !(this.guardian.mobile && this.mother.firstname &&
    //             this.guardian.lastname &&  this.guardian.parent &&
    //             this.guardian.email &&  this.guardian.home_address)
    //         ) trueSoFar = false;
    //     }
    // }
    return trueSoFar;
  }

  getImage(name : string){
    //todo: get iamges from database

    return '../../../assets/imgs/2.jpg'
  }

  submit(){
    // this.newStudentApplication.lastname = this.student.lastname
    // this.newStudentApplication.firstname = this.student.firstname
    // this.newStudentApplication.middlename = this.student.middlename
    // this.newStudentApplication.fullname = this.student.fullname
    // this.newStudentApplication.gender = this.student.gender
    // this.newStudentApplication.bday = this.student.bday
    // this.newStudentApplication.home_address = this.student.home_address
    // this.newStudentApplication.lrn = this.student.lrn
    // this.newStudentApplication.religion_id = this.student.religion_id
    // this.newStudentApplication.nationality_id = this.student.nationality_id
    // this.newStudentApplication.nationality = this.student.nationality
    // this.newStudentApplication.school_id = this.student.school_id
    // this.newStudentApplication.student_cat_id = this.student.student_cat_id
    // this.newStudentApplication.father_lastname = this.father.lastname
    // this.newStudentApplication.father_firstname = this.father.firstname
    // this.newStudentApplication.father_middlename = this.father.middlename
    // this.newStudentApplication.father_email = this.father.email
    // this.newStudentApplication.father_home_address = this.father.home_address
    // this.newStudentApplication.father_mobile = this.father.mobile
    // this.newStudentApplication.mother_lastname = this.mother.lastname
    // this.newStudentApplication.mother_firstname = this.mother.firstname
    // this.newStudentApplication.mother_middlename = this.mother.middlename
    // this.newStudentApplication.mother_email = this.mother.email
    // this.newStudentApplication.mother_home_address = this.mother.home_address
    // this.newStudentApplication.mother_mobile = this.mother.mobile
    // this.newStudentApplication.guardian = this.isGuardian
    // this.newStudentApplication.guardian_lastname = this.guardian.lastname
    // this.newStudentApplication.guardian_firstname = this.guardian.firstname
    // this.newStudentApplication.guardian_middlename = this.guardian.middlename
    // this.newStudentApplication.guardian_email = this.guardian.email
    // this.newStudentApplication.guardian_home_address = this.guardian.home_address
    // this.newStudentApplication.guardian_mobile = this.guardian.mobile

    this.newStudentApplication.lastname = 'leba'
    this.newStudentApplication.firstname = 'eniel'
    this.newStudentApplication.middlename = ''
    this.newStudentApplication.fullname = ''
    this.newStudentApplication.gender = 'Male'
    this.newStudentApplication.bday = new Date("2022-12-22")
    this.newStudentApplication.home_address = 'aup'
    this.newStudentApplication.lrn = 'asdf'
    this.newStudentApplication.religion_id = 100
    this.newStudentApplication.nationality_id = 100
    this.newStudentApplication.nationality = ''
    this.newStudentApplication.school_id = 1114
    this.newStudentApplication.student_cat_id = 'E'
    this.newStudentApplication.father_lastname = 'leba'
    this.newStudentApplication.father_firstname = 'ariel'
    this.newStudentApplication.father_middlename = 'ambomo'
    this.newStudentApplication.father_email = 'his@email.com'
    this.newStudentApplication.father_home_address = 'his address'
    this.newStudentApplication.father_mobile = '00112233'
    this.newStudentApplication.mother_lastname = ''
    this.newStudentApplication.mother_firstname = ''
    this.newStudentApplication.mother_middlename = ''
    this.newStudentApplication.mother_email = ''
    this.newStudentApplication.mother_home_address = ''
    this.newStudentApplication.mother_mobile = ''
    this.newStudentApplication.guardian = 'Father'
    this.newStudentApplication.guardian_lastname = ''
    this.newStudentApplication.guardian_firstname = ''
    this.newStudentApplication.guardian_middlename = ''
    this.newStudentApplication.guardian_email = ''
    this.newStudentApplication.guardian_home_address = ''
    this.newStudentApplication.guardian_mobile = ''
    console.log({... this.newStudentApplication})
    let save = this.studentService.registerStudent(this.newStudentApplication);

    // if(save)
    //   this.route.navigate(['student/dashboard'])
  }


}
