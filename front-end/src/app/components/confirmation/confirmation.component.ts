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
    console.log(1)
    this.confirmPublish.updateGlobalVar(true);
    console.log(2)
    this.modalRef.close();
    console.log(3)
  }

  close(){
    this.confirmPublish.updateGlobalVar(false);
    this.modalRef.close();
  }

}
