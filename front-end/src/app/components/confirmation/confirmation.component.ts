import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  title : string = '';
  confirmation : string = '';

  constructor(
    public modalRef: MdbModalRef<ConfirmationComponent>,
    private confirmPublish : ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  confirm(){
    this.confirmPublish.updateGlobalVar(true);
    this.modalRef.close();
  }

  close(){
    this.confirmPublish.updateGlobalVar(false);
    this.modalRef.close();
  }

}
