import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  title : string | null = null;
  body : string | null = null;
  error: boolean | null = null;

  constructor(
    public modalRef: MdbModalRef<LoaderComponent>,
    ) { }

  ngOnInit(): void {
  }

}
