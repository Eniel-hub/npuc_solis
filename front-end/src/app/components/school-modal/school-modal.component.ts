import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-school-modal',
  templateUrl: './school-modal.component.html',
  styleUrls: ['./school-modal.component.css']
})
export class SchoolModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<SchoolModalComponent>) {
  }

  ngOnInit(): void {
  }

}
