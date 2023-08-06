import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/services/user.service';
import { GlobalStudent } from 'src/app/services/Global.student.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<DeleteComponent>,
    public GlobalStudent: GlobalStudent,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  delete = () => {
    this.userService.deleteAcc().subscribe((response: any) => {
      if (response.error) {
        console.log('error while deleting the account');
        return;
      }

      this.removeStudent();
      this.modalRef.close();
      this.router.navigate(['/home']);
    });
  };

  removeStudent() {
    this.GlobalStudent.updateGlobalVar({});
  }
}
