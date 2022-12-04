import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';

@Component({
  selector: 'app-home-role',
  templateUrl: './home-role.component.html',
  styleUrls: ['./home-role.component.scss']
})
export class HomeRoleComponent implements OnInit {
  public displayedColumns = ['role', 'abbv', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Role>;
  roles: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate() {
    this.dataSource.data = await firstValueFrom(this.queryService.getAllRoles()) as Role[];
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      height: '350px',
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
        this.openSnackbar('Role created.', 'Dismiss');
      }
    });
  }

  openDialogUpdate(role: Role) {
    const dialogRef = this.dialog.open(UpdateRoleComponent, {
      data: {
        role: role,
      },
      height: '350px',
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
        this.openSnackbar('Role updated.', 'Dismiss');
      }
    });
  }

  openDialogDelete(role: Role) {
    const dialogRef = this.dialog.open(DeleteRoleComponent, {
      data: {
        role: role,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        const index = this.dataSource.data.findIndex(x => x.roleID === role.roleID);
        this.dataSource.data.splice(index,1)
        this.dataSource._updateChangeSubscription();

        this.openSnackbar('Role deleted.', 'Dismiss');
      }
    });
  }

  openSnackbar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 3000
    });
  }

}
