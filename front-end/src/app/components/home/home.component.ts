import { SchoolService } from '../../services/school.service';
import { Component, OnInit } from '@angular/core';
import { School } from '../../interfaces/School';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeComponents : any;
  schools : School[] = [];
  nextSchoolYear : string = '';
  currentSchoolYear : string = '';
  menuItems = [
    { name : 'About',      link : '/about-us'       },
    { name : 'Login',      link : '/user/login'     },
    { name : 'Register',   link : '/user/register'  }
  ];

  constructor( private service : SchoolService ) {}

  ngOnInit(): void {

    this.service.getHomeComponent()
        .subscribe(response => {
          this.homeComponents = response;
          this.schools = this.homeComponents.schools;
          this.currentSchoolYear = this.homeComponents.current_year.school_year;
          this.nextSchoolYear = this.homeComponents.next_year.school_year;
        });
  }

}

