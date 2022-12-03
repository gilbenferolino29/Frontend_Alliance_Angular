import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { QueryService } from 'src/app/services/query.service';

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
    public dialog: MatDialog
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

}
