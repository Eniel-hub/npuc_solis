import { School } from '../../interfaces/School';
import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';
import {
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faCaretLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
})
export class SchoolComponent implements OnInit {
  homeComponents: any;
  arrSchools: School[] = [];
  selectedSchool: School = { ID: 0 };
  bgURL: string = '';
  upIcon = faCaretUp;
  leftIcon = faCaretLeft;
  rightIcon = faCaretRight;
  downIcon = faCaretDown;
  searchIcon = faMagnifyingGlass;
  wrapperClassList: string = 'wrapper';
  wrapperIsActive: boolean = false;
  label: String = 'Select School';
  schools: School[] = [];
  value: string = '';
  arrOfSchools: any;
  userSubscription: any;

  constructor(private service: SchoolService) {}

  ngOnInit(): void {
    this.service.getHomeComponent().subscribe((response) => {
      this.homeComponents = response;
      this.arrSchools = this.homeComponents.schools;
      this.arrOfSchool(this.arrSchools);
    });
  }

  getImage(name: string) {
    //todo: get iamges from database

    return '../../../assets/imgs/2.jpg';
  }

  arrOfSchool(schools: School[]) {
    let arr = [];
    let temp: School[] = [];
    let last;
    for (let index = 0; index < schools.length; index++) {
      temp.push(schools[index]);
      if (index % 4 == 3) {
        last = index;
        arr.push(temp);
        temp = [];
      }
    }
    if (last != schools.length) {
      arr.push(temp);
    }
    this.arrOfSchools = arr;
  }

  searchSchool(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.schools = this.arrSchools.filter((school) => {
      return school.school_name
        ?.toLowerCase()
        .includes(this.value.toLowerCase());
    });
    this.arrOfSchool(this.schools);
  }
}
