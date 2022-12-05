import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  form = this.fb.group({
    roleName: ['', [Validators.required]],
    roleAbbv: ['', [Validators.required]]
  });
  
  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createRole() {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('roleName', this.roleName.value!.toString());
      formData.append('roleAbbv', this.roleAbbv.value!.toString());
  
      this.queryService.createRole(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }

  get roleName() {
    return this.form.controls.roleName;
  }

  get roleAbbv() {
    return this.form.controls.roleAbbv;
  }
}
