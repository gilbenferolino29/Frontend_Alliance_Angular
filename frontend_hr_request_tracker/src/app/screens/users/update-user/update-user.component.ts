import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/IUser';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  roleList: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateUserComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.roleList = await firstValueFrom(this.queryService.getAllRoles()) as Role[];
  }

  updateUser(user: User) {
    let formData: FormData = new FormData();

    console.log(user);

    formData.append('userID', user.userID.toString());
    formData.append('userRole', user.userRole.roleID.toString());
    formData.append('username', user.username.toString());
    formData.append('userPassword', user.userPassword.toString());
    formData.append('userFName', user.userFName.toString());
    formData.append('userLName', user.userLName.toString());
    formData.append('userEmail', user.userEmail.toString());

    this.queryService.updateUser(formData).subscribe();
    this.dialogRef.close(true);
  }

  selectRole(role: any, event: any) {
    if(event.isUserInput) {
      this.data['user'].role = role;
    }
  }

}
