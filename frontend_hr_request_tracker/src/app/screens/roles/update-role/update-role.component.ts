import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  form = this.fb.group({
    roleID: [this.data['role'].roleID],
    roleName: [this.data['role'].roleName, [Validators.required]],
    roleAbbv: [this.data['role'].roleAbbv, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateRoleComponent>,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  updateRole() {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('roleID', this.roleID.value!.toString());
      formData.append('roleName', this.roleName.value!.toString());
      formData.append('roleAbbv', this.roleAbbv.value!.toString());
  
      this.queryService.updateRole(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }

  get roleID() {
    return this.form.controls.roleID;
  }

  get roleName() {
    return this.form.controls.roleName;
  }

  get roleAbbv() {
    return this.form.controls.roleAbbv;
  }
}
