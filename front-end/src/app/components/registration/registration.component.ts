import { RegistrationService } from './../../services/registration.service';
import { StudentApplication } from '../../interfaces/StudentApplication';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { StudentService } from './../../services/student.service';
import { SchoolService } from '../../services/school.service';
import { LoaderComponent } from '../loader/loader.component';
import { Nationality } from '../../interfaces/Nationality';
import { AlertComponent } from '../alert/alert.component';
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
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MenuItems } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

//todo add error component
//todo add success component
//todo add loader component
export class RegistrationComponent implements OnInit {
  categories: string[] = ['School', 'Personal', 'Parents'];
  transfereeBtnClass: string = 'btn btn-outline-primary';
  newStudentBtnClass: string = 'btn btn-outline-success';
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  modalRef: MdbModalRef<AlertComponent> | null = null;
  newStudentApplication: StudentApplication = {};
  guardian: Parent = { relationship: 'Guardian' };
  father: Parent = { relationship: 'Father' };
  mother: Parent = { relationship: 'Mother' };
  btn: string[] = ['btn dis', 'btn', 'btn'];
  section: string = this.categories[0];
  studentCategories: StudentCat[] = [];
  ArrLeftClass: string = 'not-active';
  guardian_entries: string = 'hidden';
  nationalities: Nationality[] = [];
  inputNation: string = 'hidden';
  parent: string = 'parent hide';
  isFromASisSchl: boolean = false;
  isTransferee: boolean = false;
  category: string = 'Personal';
  errorClass: string = 'hidden';
  idPersonal: string = 'active';
  personal: string = 'personal';
  isDisabled: boolean = true;
  religions: Religion[] = [];
  errorMessage: string = '';
  arrSchools: School[] = [];
  allValid: boolean = false;
  idEducation: string = '';
  isGuardian: string = '';
  review: boolean = false;
  prevSchool: string = '';
  newNation: string = '';
  Schools: School[] = [];
  schools: School[] = [];
  enrollmentSchYear: any;
  student: Student = {};
  userSubscription: any;
  check: boolean = true;
  value: string = '';
  arrRight = arrRight;
  index: number = 0;
  count: number = 0;
  Page: number = 0;
  arrLeft = arrLeft;
  prevID: any;
  grades: any;
  grade: any;
  user: any;

  constructor(
    private regiService: RegistrationService,
    private studentService: StudentService,
    private modalService: MdbModalService,
    private schoolService: SchoolService,
    private GlobalUser: GlobalUser,
    private menuItems: MenuItems,
    private route: Router
  ) {
    this.userSubscription = this.GlobalUser.globalVarUserUpdate.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.menuItems.updateMenuItems(true, 'student', 'registration');

    this.schoolService.getHomeComponent().subscribe((response: any) => {
      this.arrSchools = response.schools;
      this.getSchools(this.arrSchools);
      this.enrollmentSchYear = response.next_year;
    });

    this.studentService.getAllNations().subscribe((arr: any) => {
      this.nationalities = arr;
    });

    this.studentService.getAllReligions().subscribe((arr: any) => {
      this.religions = arr;
    });

    this.studentService.getStudentCat().subscribe((arr: any) => {
      this.studentCategories = arr;
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data: {
        title: 'Registration',
        body: 'Registration Successfull',
      },
    });
  }

  gradeDisabled(index: number): boolean {
    if (!this.isTransferee) {
      if (
        this.grades[index].grade_level.match(/^\w{6}\sI$/) ||
        this.grades[index].grade_level.match(/1/)
      )
        return false;
      return true;
    }
    return false;
  }

  searchSchool(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    let schools = this.arrSchools.filter((school) => {
      return school.school_name
        ?.toLowerCase()
        .includes(this.value.toLowerCase());
    });
    this.getSchools(schools);
  }

  getSchools(schools: School[]) {
    this.schools = schools;
  }

  inputSchool(value: number) {
    this.student.school_id = value;
    this.schoolService
      .getGrades(this.student.school_id)
      .subscribe((response: any) => {
        this.grades = response;
      });
  }

  PrevSchool(schoolName?: string) {
    this.prevSchool = schoolName ? schoolName : '';
    this.previousSchool({ isFound: true });
  }

  previousSchool(obj: { event?: Event; isFound?: boolean }) {
    let value = obj.event ? (obj.event.target as HTMLInputElement).value : '';
    if (value != '' && !obj.isFound) {
      let schools = this.arrSchools.filter((school) => {
        return school.school_name?.toLowerCase().includes(value.toLowerCase());
      });
      this.Schools = schools;
      this.isFromASisSchl = true;
      if (!schools[0]) {
        this.PrevSchool(value);
        this.isFromASisSchl = false;
      }
    } else {
      this.Schools = [];
    }
  }

  transfereeClick() {
    this.isDisabled = false;
    this.isTransferee = true;
    this.transfereeBtnClass = 'btn btn-primary';
    this.newStudentBtnClass = 'btn btn-outline-success';
  }
  newStudentClick() {
    this.isDisabled = false;
    this.isTransferee = false;
    this.newStudentBtnClass = 'btn btn-success';
    this.transfereeBtnClass = 'btn btn-outline-primary';
  }

  selectGrade(event: Event): void {
    this.grade = (event.target as HTMLInputElement).value;
  }

  getSchool(id?: number) {
    if (!id) return [{ school_name: '' }];
    return this.schools.filter((school) => {
      return school.ID == id;
    });
  }

  next() {
    if (this.checkValidity()) {
      if (this.allValid && this.check) this.check = false;
      else {
        if (this.index == this.categories.length - 1) this.index = 0;
        this.index++;
        this.section = this.categories[this.index];
        for (let i = 0; i < this.btn.length; i++) this.btn[i] = 'btn';
        this.btn[this.index] = 'btn dis';
        window.scrollTo(0, 0);
        this.errorClass = 'hidden';
        this.errorMessage = '';
      }
    } else window.scrollTo(0, 0);
  }

  previous() {
    if (this.checkValidity()) {
      if (this.allValid && this.check) this.check = false;
      else {
        if (this.index == 0) this.index = this.categories.length;
        this.index--;
        this.section = this.categories[this.index];
        for (let i = 0; i < this.btn.length; i++) this.btn[i] = 'btn';
        this.btn[this.index] = 'btn dis';
        window.scrollTo(0, 0);
        this.errorClass = 'hidden';
        this.errorMessage = '';
      }
    } else window.scrollTo(0, 0);
  }

  page(index: number) {
    this.allValid = this.checkValidity();
    if (this.student.school_id) {
      this.index = index;
      this.section = this.categories[this.index];
      for (let i = 0; i < this.btn.length; i++) this.btn[i] = 'btn';
      this.btn[this.index] = 'btn dis';
      window.scrollTo(0, 0);
    }
    return;
  }

  verifyPrevSchoolAndId(
    prevSchool: string,
    prevID: number
  ): { isFound: boolean; message: string } {
    let value = prevSchool;
    let schoolID;
    let schools = this.arrSchools.filter((school) => {
      return school.school_name?.toLowerCase().includes(value.toLowerCase());
    });
    if (!schools[0]) return { isFound: true, message: '' };
    else {
      schoolID = schools[0].ID;
      let obj = { isFound: false, message: '' };
      if (schoolID === this.student.school_id) {
        return {
          isFound: false,
          message: 'Choose a different school of provenance',
        };
      }
      this.studentService
        .studentExistInSchool(prevID, schoolID)
        .subscribe((res: any) => {
          obj = res;
        });
      setTimeout(() => {
        console.log(obj);
        return obj;
      }, 500);
      console.log(obj);
      return obj;
    }
  }

  checkValidity() {
    //first page
    let trueSoFar: boolean = false;
    if (this.index == 0) {
      if (this.student.school_id) {
        if (this.isTransferee) {
          if (this.prevSchool && this.grade) {
            let obj = this.verifyPrevSchoolAndId(this.prevSchool, this.prevID);
            if (obj.isFound == true) trueSoFar = true;
            else {
              trueSoFar = false;
              this.errorMessage = obj.message;
            }
          } else {
            this.errorMessage = 'Please fill up all required fields';
            trueSoFar = false;
          }
        } else if (this.grade) {
          trueSoFar = true;
        } else {
          trueSoFar = false;
          this.errorMessage = 'Please fill up all required fields';
        }
      } else {
        this.errorMessage = 'Please fill up all required fields';
        trueSoFar = false;
      }
    }

    if (this.index == 1) {
      if (
        this.student.lastname &&
        this.student.firstname &&
        this.student.gender &&
        this.student.bday &&
        this.student.home_address &&
        this.student.religion_id &&
        this.student.nationality_id
      )
        trueSoFar = true;
      else {
        this.errorMessage =
          'Please fill up all required fields reguarding personal information';
        trueSoFar = false;
      }
    }

    if (this.index == 2) {
      if (this.isGuardian) trueSoFar = true;
      else {
        {
          trueSoFar = false;
          this.errorMessage = 'Please choose a guardian';
        }
      }
      if (this.isGuardian.match('Father')) {
        this.student.Guardian = 'Father';

        if (
          !(
            this.father.mobile &&
            this.father.firstname &&
            this.father.lastname &&
            this.father.relationship &&
            this.father.email &&
            this.father.home_address
          )
        ) {
          trueSoFar = false;
          this.errorMessage =
            'fill up all required fields on father informations';
        }
      }
      if (trueSoFar && this.isGuardian.match('Mother')) {
        if (this.isGuardian.match('Father'))
          this.student.Guardian = 'Father & Mother';
        else this.student.Guardian = 'Mother';

        if (
          !(
            this.mother.mobile &&
            this.mother.firstname &&
            this.mother.lastname &&
            this.mother.relationship &&
            this.mother.email &&
            this.mother.home_address
          )
        ) {
          trueSoFar = false;
          this.errorMessage =
            'fill up all required fields on mother informations';
        }
      }
      if (trueSoFar && this.isGuardian.match('Guardian')) {
        this.student.Guardian = 'Guardian';

        if (
          !(
            this.guardian.mobile &&
            this.mother.firstname &&
            this.guardian.lastname &&
            this.guardian.relationship &&
            this.guardian.email &&
            this.guardian.home_address
          )
        ) {
          trueSoFar = false;
          this.errorMessage =
            'fill up all required fields on guardian informations';
        }
      }

      this.allValid = trueSoFar;
    }

    if (!trueSoFar) {
      this.errorClass = 'error';
    }
    return trueSoFar;
  }

  Review() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data: {
        title: 'Registration',
        body: 'please confirm your informations',
      },
    });
    this.review = !this.review;
    window.scrollTo(0, 0);
  }

  studentNationality() {
    return this.nationalities.filter((nat) => {
      return nat.ID == this.student.nationality_id;
    })[0].nationality;
  }

  studentReligion() {
    return this.religions.filter((reli) => {
      return reli.ID == this.student.religion_id;
    })[0].religion;
  }

  getStudentCategory(grade_level: string) {
    if (grade_level.match(/^\w{6}.*/)) {
      return 'P';
    } //Kinder I & II
    if (grade_level.match(/^\w{5}\s[123456]$/)) {
      return 'E';
    } //Grades 1 - 6
    if (grade_level.match(/^\w{5}\s[7891]0?$/)) {
      return 'J';
    } //Grades 7 - 10
    if (grade_level.match(/^\w{5}\s1[12]$/)) {
      return 'S';
    } //Grades 11 & 12
    return 'T';
  }

  submit() {
    this.loaderRef = this.modalService.open(LoaderComponent, {
      data: {
        title: 'Registration In Progress',
      },
      ignoreBackdropClick: true,
    });
    this.student.remarks = this.isTransferee
      ? 'Transferee student'
      : 'New Student';
    this.student.student_cat_id = this.getStudentCategory(this.grade);
    this.newStudentApplication = { ...this.student };
    this.newStudentApplication.father = { ...this.father };
    this.newStudentApplication.mother = { ...this.mother };
    this.newStudentApplication.guardian = { ...this.guardian };

    this.studentService
      .registerStudent(this.newStudentApplication)
      .subscribe((response: any) => {
        if (response.error) {
          console.log(response.error);
          this.loaderRef?.close();
          return;
        }
        this.regiService
          .setNextRegistration(this.grade, this.enrollmentSchYear.ID)
          .subscribe((response: any) => {
            if (response.error) {
              this.loaderRef?.close();
              console.log(response.error);
            }
            if (response.success) {
              setTimeout(() => {
                this.loaderRef?.close();
                this.openModal();
              }, 2000);
              setTimeout(() => {
                this.route.navigate(['/student/dashboard']);
              }, 2500);
            }
          });
      });
  }
}
