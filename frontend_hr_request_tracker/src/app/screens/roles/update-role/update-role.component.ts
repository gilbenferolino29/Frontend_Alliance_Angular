import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateRoleComponent>
    ) { }

  ngOnInit(): void {
  }

  updateRole(role: Role) {
    let formData: FormData = new FormData();

    formData.append('roleID', role.roleID.toString());
    formData.append('roleName', role.roleName.toString());
    formData.append('roleAbbv', role.roleAbbv.toString());

    this.queryService.updateRole(formData).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

}
