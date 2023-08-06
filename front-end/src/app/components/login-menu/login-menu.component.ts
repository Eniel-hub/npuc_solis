import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css'],
})
export class LoginMenuComponent implements OnInit {
  barIcon = faBars;
  toggle: boolean = false;
  @Input() navClass = new BehaviorSubject('_nav2');
  @Output() hasNavigate = new EventEmitter<boolean>();
  @Input() menuItems: { name?: string; link?: string }[] = [
    {
      name: 'Student Register',
      link: '/user/register',
    },
    {
      name: 'Student Login',
      link: '/user/login',
    },
    {
      name: 'Staff Login',
      link: '/staff/login',
    },
    {
      name: 'Admin Login',
      link: '/admin/login',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navClass.next('_nav2 _2hide');
  }

  activateNav = () => {
    this.navClass.next('_nav2 _2animate-left');
  };

  navigate = (route: string) => {
    this.navClass.next('_nav2 _2hide');
    this.hasNavigate.emit(true);
    this.router.navigate([route]);
  };
}
