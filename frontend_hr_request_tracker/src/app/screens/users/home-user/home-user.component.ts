import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  public displayedColumns = ['username', 'role', 'name', 'email', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>;
  users: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate() {
    this.dataSource.data = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      height: '350px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
      }
    });
  }

}
