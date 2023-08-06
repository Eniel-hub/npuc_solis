import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAndRejectComponent } from './confirmation-and-reject.component';

describe('ConfirmationAndRejectComponent', () => {
  let component: ConfirmationAndRejectComponent;
  let fixture: ComponentFixture<ConfirmationAndRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationAndRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationAndRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
