import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  barIcon = faBars;
  toggle : boolean = false;
  @Input() navClass = new BehaviorSubject('_nav');
  @Input() menuItems : {name:string, link:string}[] = [];

  constructor() { }

  ngOnInit(): void {
    this.navClass.next('_nav hide')
  }

  activateNav = () =>{
    this.navClass.next('_nav animate-left');
  }



}
