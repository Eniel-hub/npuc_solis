import {AdminUserPublishedService} from '../../services/admin-user-published.service';
import {GlobalAdmin} from '../../services/Global.admin.service';
import {AdminService} from '../../services/admin.service';
import {Component, OnInit} from '@angular/core';
import {Admin} from '../../interfaces/Admin';
import {cards} from '../../interfaces/cards';
import {Card} from '../../interfaces/Card';
import {Router} from '@angular/router';
import {faChevronLeft as arrLeft, faChevronRight as arrRight} from '@fortawesome/free-solid-svg-icons';

@Component({selector: 'app-personel-dashboard', templateUrl: './personel-dashboard.component.html', styleUrls: ['./personel-dashboard.component.css']})
export class PersonelDashboardComponent implements OnInit {
	isLoggedIn = localStorage.getItem('logInfo') ?. match('loggedIn');
	adminP : Admin = {};
	adminG : Admin = {};
	arrLeft = arrLeft;
	index : number = 0;
	arrRight = arrRight;
	cards : Card[] = cards;
	profilePicture : string = ';';
	card : Card = this.cards[0];
	len : number = this.cards.length;

	menuItems = [
		{
			name: 'Grade Levels',
			link: '/admin/manage/gdlv'
		},
		{
			name: 'Personels',
			link: '/admin/manage/pers'
		},
		{
			name: 'profile',
			link: '/admin/profile'
		},
		{
			name: 'about',
			link: '/about-us'
		}, {
			name: 'logout'
		},
	];

	constructor(private adminService : AdminService, private publish : AdminUserPublishedService, private GlobalAdmin : GlobalAdmin, private router : Router) {}

	ngOnInit(): void {
		window.scrollTo(0, 0);
		this.getFirstCard();

		this.publish.adminSet.subscribe((adminP : Admin) => {
			this.adminP = adminP;
		});
		this.adminG = this.isLoggedIn ? this.GlobalAdmin.getGlobalVarAdmin() : {};
		console.log(this.adminG);
	}

	getFirstCard = () => {
		this.index = Math.floor(Math.random() * this.len);
		this.card = this.cards[this.index];
	};

	next = () => {
		if (this.index >= this.len) 
			this.index = -1;
		

		this.index ++;
		this.card = this.cards[this.index];
		window.scrollTo(0, 0);
	};

	previous = () => {
		if (this.index <= 0) 
			this.index = this.len;
		

		this.index --;
		this.card = this.cards[this.index];
		window.scrollTo(0, 0);
	};
}
