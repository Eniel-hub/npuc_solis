import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LogoutComponent } from '../logout/logout.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  barIcon = faBars;
  toggle : boolean = false;
  @Input() navClass = new BehaviorSubject('_nav');
  modalRef : MdbModalRef<LogoutComponent> | null = null;
  @Input() menuItems : {name:string, link?:string}[] = [];

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.navClass.next('_nav hide');
  }

  activateNav = () =>{
    this.navClass.next('_nav animate-left');
  }

  openModal() {
    this.modalRef = this.modalService.open(LogoutComponent)
  }


}
