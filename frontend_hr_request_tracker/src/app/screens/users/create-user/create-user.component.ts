import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  roleList: any = [];

  username: any;
  userFName: any;
  userLName: any;
  userPassword: any;
  userEmail: any;
  userRole: any;

  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.roleList = await firstValueFrom(this.queryService.getAllRoles()) as Role[];
  }

  createUser() {
    let formData: FormData = new FormData();

    formData.append('userRole', this.userRole.toString());
    formData.append('username', this.username.toString());
    formData.append('userPassword', this.userPassword.toString());
    formData.append('userFName', this.userFName.toString());
    formData.append('userLName', this.userLName.toString());
    formData.append('userEmail', this.userEmail.toString());

    this.queryService.createUser(formData).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  selectRole(role: any, event: any) {
    if(event.isUserInput) {
      this.userRole = role;
    }
  }

}
