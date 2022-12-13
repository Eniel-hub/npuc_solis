import { User } from '../../interfaces/User';
import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() toggleSignButton : string = '';
  res : any;
  user : User = {};
  userIcon = faUser;
  hasUser : boolean = false;
  homeLink : string = '';

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getUser()
    .subscribe(response => {
      this.res = response;
      if(this.res.message){
        this.hasUser = false
      }else{
        this.user = response
      }
      console.log(this.user)
    });

    let strings = window.location.href.split(window.location.host);
    let url = strings[strings.length-1];

    switch (url) {
      case '/':
      case '/home':
        this.homeLink = '#home';
        break;
      case '/user/login':
        this.homeLink = '/user/login';
        break;
      case '/user/register':
        this.homeLink = '/user/register';
        break;
      default:
        this.homeLink = '/student/dashboard';
    }
  }

}
