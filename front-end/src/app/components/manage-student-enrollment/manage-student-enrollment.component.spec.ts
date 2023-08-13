import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentEnrollmentComponent } from './manage-student-enrollment.component';

describe('ManageStudentEnrollmentComponent', () => {
  let component: ManageStudentEnrollmentComponent;
  let fixture: ComponentFixture<ManageStudentEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStudentEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStudentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
