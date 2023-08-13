import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LogoutComponent } from '../logout/logout.component';
import { DeleteComponent } from '../delete/delete.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  barIcon = faBars;
  toggle: boolean = false;
  @Input() navClass = new BehaviorSubject('_nav');
  @Output() hasNavigate = new EventEmitter<boolean>();
  modalRef: MdbModalRef<LogoutComponent> | null = null;
  @Input() menuItems: { name?: string; link?: string }[] = [];

  constructor(private modalService: MdbModalService, private router: Router) {}

  ngOnInit(): void {
    this.navClass.next('_nav hide');
  }

  activateNav = () => {
    this.navClass.next('_nav animate-left');
  };

  navigate = (route: string) => {
    this.navClass.next('_nav hide');
    this.hasNavigate.emit(true);
    this.router.navigate([route]);
  };

  logout() {
    this.navClass.next('_nav hide');
    this.hasNavigate.emit(true);
    this.openModal();
  }

  delete() {
    this.navClass.next('_nav hide');
    this.hasNavigate.emit(true);
    this.deleteModal();
  }

  openModal() {
    this.navClass.next('_nav hide');
    this.modalRef = this.modalService.open(LogoutComponent);
  }

  deleteModal() {
    this.navClass.next('_nav hide');
    this.modalRef = this.modalService.open(DeleteComponent, {
      data: {
        action: 'account',
        body: 'Do you want to Delete your account? Please note that this action is irreversible!',
      },
    });
  }
}
