import { Component, OnInit } from '@angular/core';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnInit {
  arrowIcon = faCircleArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
