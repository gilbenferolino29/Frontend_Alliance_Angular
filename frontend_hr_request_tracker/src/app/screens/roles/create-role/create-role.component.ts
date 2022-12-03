import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  roleName: any;
  roleAbbv: any;
  
  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateRoleComponent>
  ) { }

  ngOnInit(): void {
  }

  createRole() {
    let formData: FormData = new FormData();

    formData.append('roleName', this.roleName.toString());
    formData.append('roleAbbv', this.roleAbbv.toString());

    this.queryService.createRole(formData).subscribe();
    this.dialogRef.close(true);
  }
}
