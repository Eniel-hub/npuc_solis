import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  title : string | null = null;
  body : string | null = null;
  error: boolean | null = null;

  constructor(
    public modalRef: MdbModalRef<AlertComponent>,
    ) { }

  ngOnInit(): void {
  }

}
