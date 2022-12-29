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
  hasDropdown : boolean = false;
  menuIsActive : boolean = false;
  menuClass = new BehaviorSubject('hide');
  @Input() menuItems : {name : string, link? : string}[] = [];

  constructor() { }

  ngOnInit(): void {
    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    if(url.match('student') || url.match('profile')){
      this.hasDropdown = true
      this.homeLink = '/student/dashboard'
    }
    else{
      this.hasDropdown = false
      this.homeLink = '/home'
    }
  }

  MenuToggle = () =>{
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
