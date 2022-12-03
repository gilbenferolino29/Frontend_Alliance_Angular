import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DeleteRoleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<DeleteRoleComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteRole(role: Role) {
    this.queryService.deleteRole(role.roleID.toString()).subscribe();
    this.dialogRef.close(true);
  }

}
