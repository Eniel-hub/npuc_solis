import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelDashboardComponent } from './personel-dashboard.component';

describe('PersonelDashboardComponent', () => {
  let component: PersonelDashboardComponent;
  let fixture: ComponentFixture<PersonelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonelDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
