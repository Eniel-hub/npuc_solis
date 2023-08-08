import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menuItems: { name: string; link?: string }[] = [];
  classActive: boolean = false;

  constructor() {}

  ngOnInit() {}
}
