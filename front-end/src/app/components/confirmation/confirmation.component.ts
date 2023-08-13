import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { ConfirmationAndRejectComponent } from '../confirmation-and-reject/confirmation-and-reject.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  title: string = '';
  confirmation: string = '';
  confirmationFunction: string = '';

  constructor(
    public modalRef: MdbModalRef<ConfirmationComponent>,
    private confirmPublish: ConfirmationService
  ) {}

  ngOnInit(): void {}

  confirm(confirmationFunction?: string) {
    if (confirmationFunction == 'approve') return this.confirmApprove();
    if (confirmationFunction == 'reject') return this.confirmReject();
    if (confirmationFunction == 'delete') return this.confirmDelete();
    this.confirmPublish.updateGlobalVar(true);
    this.modalRef.close();
  }

  confirmApprove() {
    this.confirmPublish.updateGlobalVarAP(true);
    this.modalRef.close();
  }
  confirmReject() {
    this.confirmPublish.updateGlobalVarRE(true);
    this.modalRef.close();
  }
  confirmDelete() {
    this.confirmPublish.updateGlobalVarDE(true);
    this.modalRef.close();
  }

  close() {
    this.confirmPublish.updateGlobalVar(false);
    this.modalRef.close();
  }
}
