import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { Error } from '../../interfaces/Error';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
import { Admin } from 'src/app/interfaces/Admin';
import { AdminService } from 'src/app/services/admin.service';
import { School } from 'src/app/interfaces/School';
import { Student } from 'src/app/interfaces/Student';
import { ConfirmationAndRejectComponent } from '../confirmation-and-reject/confirmation-and-reject.component';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { RejectService } from 'src/app/services/reject.service';
import { MenuItems } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-manage-level',
  templateUrl: './manage-level.component.html',
  styleUrls: ['./manage-level.component.css'],
})
export class ManageLevelComponent implements OnInit {
  appRejRef: MdbModalRef<ConfirmationAndRejectComponent> | null = null;
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  modalRef: MdbModalRef<AlertComponent> | null = null;

  menuItems = [
    { name: 'home', link: '/home' },
    { name: 'About', link: '/about-us' },
    { name: 'Login', link: '/user/login' },
  ];
  admin: Admin = { ID: 'Admin', account_name: 'Eniel Leba', staff_id: 1213 };
  user: User = { ...this.admin, type: 'admin' };
  school: School = {
    ID: 0,
  };
  students: Student[] = [];
  schoolYears: any;
  gradeLevels: any;
  sections: any;
  nbrStudents: any;
  teacher: any;

  schoolYearSelected: any;
  gradeLevelSelected: any;
  sectionSelected: any;
  section: any;
  schoolYear: any;
  gradeLevel: any;

  schoolYearClicked: any = false;
  gradeLevelClicked: any = false;
  sectionClicked: any = false;

  eyeSlashIcon = faEyeSlash;
  eyeIcon = faEye;
  isEditing = false;
  canActivate = false;
  isApproved = false;
  isRejected = false;

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router,
    private confirmPublished: ConfirmationService,
    private rejectPublished: RejectService,
    private menuItemsService: MenuItems
  ) {}

  ngOnInit(): void {
    this.menuItemsService.updateMenuItems(true, 'admin');
    window.scrollTo(0, 0);

    // get school
    this.adminService.getSchool(this.user).subscribe((response: any) => {
      if (response.error) return;
      this.school = response;

      //get grade levels
      this.adminService
        .getGradeLevels(this.school.ID)
        .subscribe((response: any) => {
          if (response.error) return;
          this.gradeLevels = response;
        });
    });

    // get academic year
    this.adminService.getSchoolYears().subscribe((response: any) => {
      if (response.error) return;
      this.schoolYears = response;
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(AlertComponent, {
      data: {
        title: 'Approve/Reject',
        body: 'Successfull',
      },
    });
  }

  eyeClick() {}

  clickedSchoolYear() {
    this.schoolYearClicked = true;
    return;
  }

  clickedGradeLevel() {
    this.gradeLevelClicked = true;
    return;
  }

  clickedSection() {
    if (!this.gradeLevelSelected) return;

    console.log(this.gradeLevelSelected);

    //get grade sections
    this.adminService
      .getGradeSections(this.gradeLevelSelected)
      .subscribe((response: any) => {
        if (response.error) return;
        this.sections = response;
        this.sectionClicked = true;
      });
    return;
  }

  getInput(num: number, event: Event): void {}

  displayStudent() {
    //get section object
    this.section = this.sections.filter((section: any) => {
      if (section.ID == this.sectionSelected) return section;
    });
    //get grade object
    this.gradeLevel = this.gradeLevels.filter((gradeLevel: any) => {
      if (gradeLevel.ID == this.gradeLevelSelected) return gradeLevel;
    });
    //get year object
    this.schoolYear = this.schoolYears.filter((schoolYear: any) => {
      if (schoolYear.ID == this.schoolYearSelected) return schoolYear;
    });

    this.adminService
      .getStudents(this.sectionSelected, this.schoolYearSelected)
      .subscribe((response: any) => {
        if (response.error) return;
        this.students = response;
        this.nbrStudents = this.students.length;
      });

    this.adminService
      .getTeacher(this.sectionSelected)
      .subscribe((response: any) => {
        if (response.error) return;
        this.teacher = response;
      });
  }

  actionApprove(student_id: any) {
    this.appRejRef = this.modalService.open(ConfirmationAndRejectComponent, {
      data: {
        title: 'Approval',
        confirmation: `Do you want to proceed or reject the enrollment of the student with ID ${student_id}?`,
      },
    });

    this.appRejRef.onClose.subscribe(() => {
      this.isApproved = this.confirmPublished.getGlobalVarStudent();
      if (this.isApproved) {
        this.loaderRef = this.modalService.open(LoaderComponent, {
          data: {
            title: 'Enrollment In Progress',
          },
          ignoreBackdropClick: true,
        });
      }

      setTimeout(() => {
        this.loaderRef?.close();
        this.openModal();
        console.log(`student ${student_id} Enrolled`);
      }, 2000);

      if (this.isRejected) {
        this.loaderRef = this.modalService.open(LoaderComponent, {
          data: {
            title: 'Reject In Progress',
          },
          ignoreBackdropClick: true,
        });
      }

      setTimeout(() => {
        this.loaderRef?.close();
        this.openModal();
        console.log(`student ${student_id} Enrolled`);
      }, 2000);

      // this.adminService
      //   .setNextRegistration(this.nxtGradeLevel, this.enrollmentSchYear.ID)
      //   .subscribe((response: any) => {
      //     if (response.error) {
      //       this.loaderRef?.close();
      //       console.log(response.error);
      //     }
      //     if (response.success) {
      //       setTimeout(() => {
      //         this.loaderRef?.close();
      //         this.openModal();
      //       }, 2000);
      //       setTimeout(() => {
      //         this.route.navigate(['/student/dashboard']);
      //       }, 2500);
      //     }
      //   });
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
  }

  submitEditing() {
    console.log('submitted');
    console.log(this.gradeLevelSelected);
    console.log(this.schoolYearSelected);
    this.isEditing = false;
  }

  tdStatut(statut: string): string {
    if (statut.match('Not Approved') || statut.match('error'))
      return 'tdStatut-Not-Approved';
    if (statut.match('enrolled')) return 'tdStatut-Enrolled';
    if (statut.match('registered')) return 'tdStatut-Pending';

    return '';
  }
}
