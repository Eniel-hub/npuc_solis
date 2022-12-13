import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  barIcon = faBars;
  homeLink : string = '';
  currentRouter : string = '';
  menuIsActive : boolean = false;
  menuClass = new BehaviorSubject('hide');
  classActive : boolean = false;
  @Input() menuItems : {name : string, link : string}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  MenuToggle = () =>{
    if(!this.classActive){
      this.menuIsActive = this.classActive;
      this.classActive = !this.classActive;
      this.MenuToggle();
    }

    this.menuIsActive = !this.menuIsActive;
    if(this.menuIsActive){
      this.menuClass.next('_nav animate-right');
    } else {
      this.menuClass.next('_nav animate-left');
    }
    if(!this.menuIsActive)
      setTimeout( ()=>{
        this.menuClass.next('_nav hide');
      }, 500);
  }

}
