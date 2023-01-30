import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  ani = '';
  xIcon = '';
  Icon : any;
  barIcon = faBars;
  xmarkIcon = faXmark;
  homeLink : string = '';
  currentRouter : string = '';
  hasDropdown : boolean = false;
  menuIsActive : boolean = false;
  menuClass = new BehaviorSubject('hide');
  @Input() menuItems : {name : string, link? : string}[] = [];

  constructor() { }

  ngOnInit(): void {
    this.Icon = this.barIcon;
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
    this.ani = this.menuIsActive ? 'ani2' : 'ani1';
    setTimeout( ()=>{
      this.ani = '';
    }, 1000);
    this.menuIsActive = !this.menuIsActive;
    setTimeout( ()=>{
      this.ani = this.ani + ' ani'
      this.Icon = this.menuIsActive ? this.xmarkIcon : this.barIcon;
    }, 333);
    if(this.menuIsActive){
      this.xIcon = 'xIcon ';
      this.menuClass.next('_nav animate-right');
    } else {
      this.xIcon = '';
      this.menuClass.next('_nav animate-left');
    }
    if(!this.menuIsActive)
      setTimeout( ()=>{
        this.menuClass.next('_nav hide');
      }, 500);
  }

}
