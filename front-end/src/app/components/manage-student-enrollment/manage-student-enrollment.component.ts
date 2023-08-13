import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AdminService } from 'src/app/services/admin.service';
import { MenuItems } from 'src/app/services/menu-items.service';
import { GlobalUser } from 'src/app/services/Global.user.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { LoaderComponent } from '../loader/loader.component';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-manage-student-enrollment',
  templateUrl: './manage-student-enrollment.component.html',
  styleUrls: [
    './manage-student-enrollment.component.css',
    '../enrollment/enrollment.component.css',
    '../registration/registration.component.css',
  ],
})
export class ManageStudentEnrollmentComponent implements OnInit {
  user: any;
  regID: any;
  school: any;
  sections: any;
  gradeLevels: any;
  registration: any;
  sectionSelected: any;
  edit: boolean = false;
  gradeLevelSelected: any;
  isDelete: boolean = false;
  isReject: boolean = false;
  isApprove: boolean = false;
  sectionClicked: boolean = false;
  gradeLevelClicked: boolean = false;

  confirmRef: MdbModalRef<ConfirmationComponent> | null = null;
  loaderRef: MdbModalRef<LoaderComponent> | null = null;
  alertRef: MdbModalRef<AlertComponent> | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private modalService: MdbModalService,
    private GlobalUser: GlobalUser,
    private confirmPublished: ConfirmationService,
    private menuItemsService: MenuItems
  ) {
    this.GlobalUser.getGlobalUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.menuItemsService.updateMenuItems(true, 'admin');
    window.scrollTo(0, 0);

    // get school
    this.adminService.getSchool(this.user).subscribe((response: any) => {
      if (response.error) return;
      this.school = response;
    });

    this.regID = this.route.snapshot.paramMap.get('regid');
    this.adminService.GetRegistration(this.regID).subscribe((response: any) => {
      if (response.error) {
        return;
      }

      this.registration = response;

      if (this.registration.grade_level || this.registration.grade_level_id) {
        this.gradeLevelSelected =
          this.registration.grade_level || this.registration.grade_level_id;
        this.adminService
          .getGradeLevels(this.school.ID)
          .subscribe((response: any) => {
            if (response.error) return;
            this.registration.grade_level = response.filter(
              (gradeLevel: any) => {
                if (gradeLevel.ID == this.gradeLevelSelected) {
                  return gradeLevel;
                }
              }
            );

            console.log(this.registration.grade_level);
          });
      }

      if (this.registration.section || this.registration.section_id) {
        this.sectionSelected =
          this.registration.section || this.registration.section_id;
        this.adminService
          .getGradeSections(this.gradeLevelSelected)
          .subscribe((response: any) => {
            if (response.error) return;
            this.registration.section = response.filter((section: any) => {
              if (section.ID == this.sectionSelected) return section;
            });
          });
      }
    });
  }

  takeAction() {
    if (this.registration.is_enrollment == 1) this.edit = true;
    //else open alert
  }

  Cancel() {
    this.edit = false;
    this.gradeLevelClicked = false;
    this.gradeLevelSelected = null;
    this.sectionSelected = null;
    this.sectionClicked = false;
  }

  Delete() {
    this.confirmRef = this.modalService.open(ConfirmationComponent, {
      data: {
        title: 'Enroll Student',
        confirmation:
          'Do you want to Delete this enrollement? this action is irreversible',
        confirmationFunction: 'delete',
      },
    });

    this.confirmRef.onClose.subscribe(() => {
      this.isDelete = this.confirmPublished.getGlobalVarDE();
      if (this.isDelete) {
        this.loaderRef = this.modalService.open(LoaderComponent, {
          data: {
            title: 'Delete the Enrollment in Progress',
          },
          ignoreBackdropClick: true,
        });

        this.adminService
          .deleteRegistration(this.regID)
          .subscribe((response: any) => {
            if (response.error) {
              this.loaderRef?.close();
              console.log(response.error);
            }
            if (response.success) {
              setTimeout(() => {
                this.loaderRef?.close();
                this.confirmRef = this.modalService.open(AlertComponent, {
                  data: {
                    title: 'Enroll Student',
                    confirmation: 'Successfully Deleted',
                  },
                });
                this.Cancel();
              }, 2000);
            }
          });
      }
    });
  }

  Approve() {
    if (!this.gradeLevelSelected || !this.sectionSelected) {
      this.confirmRef = this.modalService.open(ConfirmationComponent, {
        data: {
          title: 'Enroll Student',
          confirmation: 'Please fill up all fields before continuying',
        },
      });
    } else {
      this.confirmRef = this.modalService.open(ConfirmationComponent, {
        data: {
          title: 'Enroll Student',
          confirmation: 'Do you want to Approve this enrollment?',
          confirmationFunction: 'approve',
        },
      });

      this.confirmRef.onClose.subscribe(() => {
        this.isApprove = this.confirmPublished.getGlobalVarAP();
        if (this.isApprove) {
          this.loaderRef = this.modalService.open(LoaderComponent, {
            data: {
              title: 'Enrollment In Progress',
            },
            ignoreBackdropClick: true,
          });

          this.registration.grade_level = this.gradeLevelSelected;
          this.registration.section = this.sectionSelected;

          this.adminService
            .approveRegistration(this.regID, this.registration)
            .subscribe((response: any) => {
              if (response.error) {
                this.loaderRef?.close();
                console.log(response.error);
              }
              if (response.success) {
                setTimeout(() => {
                  this.loaderRef?.close();
                  this.confirmRef = this.modalService.open(AlertComponent, {
                    data: {
                      title: 'Enroll Student',
                      body: 'Successfully Approved',
                    },
                  });
                  this.Cancel();
                }, 2000);
              }
            });
        }
      });
    }
  }

  Reject() {
    this.confirmRef = this.modalService.open(ConfirmationComponent, {
      data: {
        title: 'Enroll Student',
        confirmation: 'Do you want to Reject this enrollment?',
        confirmationFunction: 'reject',
      },
    });

    this.confirmRef.onClose.subscribe(() => {
      this.isReject = this.confirmPublished.getGlobalVarRE();
      if (this.isReject) {
        this.loaderRef = this.modalService.open(LoaderComponent, {
          data: {
            title: 'Reject the Enrollment in Progress',
          },
          ignoreBackdropClick: true,
        });

        this.adminService
          .rejectRegistration(this.regID)
          .subscribe((response: any) => {
            if (response.error) {
              this.loaderRef?.close();
              console.log(response.error);
            }
            if (response.success) {
              setTimeout(() => {
                this.loaderRef?.close();
                this.confirmRef = this.modalService.open(AlertComponent, {
                  data: {
                    title: 'Enroll Student',
                    body: 'Enrollment rejected successfully',
                  },
                });
                this.Cancel();
              }, 2000);
            }
          });
      }
    });
  }

  clickedGradeLevel() {
    this.adminService
      .getGradeLevels(this.school.ID)
      .subscribe((response: any) => {
        if (response.error) return;
        this.gradeLevels = response;
        this.gradeLevelClicked = true;
      });
  }

  clickedSection() {
    if (!this.gradeLevelSelected) return;

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
}
