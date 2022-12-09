import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.group({
    username: ['', [Validators.required]],
    userFName: ['', [Validators.required]],
    userLName: ['', [Validators.required]],
    userPassword: ['', [Validators.required]],
    userEmail: ['', [Validators.required, Validators.email]],
    userRole: ['', [Validators.required]]
  });

  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.roleList = await firstValueFrom(this.queryService.getAllRoles()) as Role[];
  }

  createUser() {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('userRole', this.userRole.value!.toString());
      formData.append('username', this.username.value!.toString());
      formData.append('userPassword', this.userPassword.value!.toString());
      formData.append('userFName', this.userFName.value!.toString());
      formData.append('userLName', this.userLName.value!.toString());
      formData.append('userEmail', this.userEmail.value!.toString());
  
      this.queryService.createUser(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
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
