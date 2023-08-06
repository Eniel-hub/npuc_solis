import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RejectService } from 'src/app/services/reject.service';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-confirmation-and-reject',
  templateUrl: './confirmation-and-reject.component.html',
  styleUrls: ['./confirmation-and-reject.component.css'],
})
export class ConfirmationAndRejectComponent implements OnInit {
  title: string = '';
  confirmation: string = '';

  constructor(
    public modalRef: MdbModalRef<ConfirmationAndRejectComponent>,
    private confirmPublish: ConfirmationService,
    private rejectPublish: RejectService
  ) {}

  ngOnInit(): void {}

  Approve() {
    this.confirmPublish.updateGlobalVar(true);
    this.modalRef.close();
  }

  Reject() {
    this.rejectPublish.updateGlobalVar(true);
    this.modalRef.close;
  }

  close() {
    this.confirmPublish.updateGlobalVar(false);
    this.modalRef.close();
  }
}
