import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';

interface MenuItem {
	name?: string;
	link?: string;
}

@Injectable({providedIn: 'root'})
export class MenuItems {
	menuItems : MenuItem[] = [];
	menuItemsUpdate !: Observable < MenuItem[] >;
	menuItemsObserver !: Observer < MenuItem[] >;

	constructor() {
		this.menuItemsUpdate = new Observable((observer : Observer < MenuItem[] >) => {
			this.menuItemsObserver = observer;
		});
	}

	updateMenuItems(loggin : boolean, type? : string) {
		let menuItems = [{}];
		if (!loggin) {
			menuItems = [
				{
					name: 'About',
					link: '/about-us'
				},
				{
					name: 'Login',
					link: '/user/login'
				},
				{
					name: 'Register',
					link: '/user/register'
				},
				{
					name: 'Staff',
					link: '/staff/login'
				}, {
					name: 'Admin',
					link: '/admin/login'
				}, {
					name: 'Privacy Policy',
					link: '/policy'
				},
			];
		} else if (!type) {
			menuItems = [
				{
					name: 'About',
					link: '/about-us'
				}, {
					name: 'Privacy Policy',
					link: '/policy'
				}, {
					name: 'logout'
				},
			];
		} else {
			if (type ?. match('student')) 
				menuItems = [
					{
						name: 'dashboard',
						link: '/student/dashboard'
					},
					{
						name: 'enrollment',
						link: '/student/enrollment'
					},
					{
						name: 'student',
						link: '/student/profile'
					},
					{
						name: 'profile',
						link: '/user/profile'
					}, {
						name: 'about',
						link: '/about-us'
					}, {
						name: 'logout'
					},
				];
			

			if (type ?. match('admin')) 
				menuItems = [
					{
						name: 'dashboard',
						link: '/admin/dashboard'
					},
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
					}, {
						name: 'about',
						link: '/about-us'
					}, {
						name: 'logout'
					},
				];
			
		}
		this.menuItems = menuItems;
		this.menuItemsObserver.next(this.menuItems);
	}

	getMenuItems(): MenuItem[]{
		return this.menuItems;
	}
}
