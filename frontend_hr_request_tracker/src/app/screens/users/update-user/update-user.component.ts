import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.group({
    userID: [this.data['user'].userID, [Validators.required]],
    userRole: [this.data['user'].userRole.roleID, [Validators.required]],
    username: [this.data['user'].username, [Validators.required]],
    userFName: [this.data['user'].userFName, [Validators.required]],
    userLName: [this.data['user'].userLName, [Validators.required]],
    userPassword: [{value: this.data['user'].userPassword, disabled: true}, [Validators.required]],
    userEmail: [this.data['user'].userEmail, [Validators.required, Validators.email]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.roleList = await firstValueFrom(this.queryService.getAllRoles()) as Role[];
  }

  updateUser() {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('userID', this.userID.value!.toString());
      formData.append('userRole', this.userRole.value!.toString());
      formData.append('username', this.username.value!.toString());
      formData.append('userPassword', this.userPassword.value!.toString());
      formData.append('userFName', this.userFName.value!.toString());
      formData.append('userLName', this.userLName.value!.toString());
      formData.append('userEmail', this.userEmail.value!.toString());
  
      this.queryService.updateUser(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }

  get userID() {
    return this.form.controls.userID;
  }

  get username() {
    return this.form.controls.username;
  }

  get userFName() {
    return this.form.controls.userFName;
  }

  get userLName() {
    return this.form.controls.userLName;
  }

  get userPassword() {
    return this.form.controls.userPassword;
  }

  get userEmail() {
    return this.form.controls.userEmail;
  }

  get userRole() {
    return this.form.controls.userRole;
  }

}
