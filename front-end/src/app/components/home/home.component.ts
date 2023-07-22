import {SchoolService} from '../../services/school.service';
import {Component, OnInit} from '@angular/core';
import {School} from '../../interfaces/School';
import {MenuItems} from 'src/app/services/menu-items.service';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
	homeComponents : any;
	schools : School[] = [];
	nextSchoolYear : string = '';
	currentSchoolYear : string = '';
	menuItems : {
		name?: string,
		link?: string
	}[] = []
	menuSubscription : any;

	constructor(private service : SchoolService, private MenuItems : MenuItems) {
		this.menuSubscription = this.MenuItems.menuItemsUpdate.subscribe((menuItems) => {
			this.menuItems = menuItems;
		});
	}

	ngOnInit(): void {
		window.scrollTo(0, 0);

		this.MenuItems.updateMenuItems(false)
		this.menuItems = this.MenuItems.getMenuItems();

		this.service.getHomeComponent().subscribe((response) => {
			this.homeComponents = response;
			this.schools = this.homeComponents.schools;
			this.currentSchoolYear = this.homeComponents.current_year.school_year;
			this.nextSchoolYear = this.homeComponents.next_year.school_year;
		});
	}
}
