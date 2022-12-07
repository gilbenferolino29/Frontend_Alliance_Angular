import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'subject', 'description', 'status', 'createdAt', 'view', 'update'];
  public userTickets = new MatTableDataSource<Ticket>;
  public agingTickets = new MatTableDataSource<Ticket>;
  public user = localStorage.getItem('user');

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.userTickets.data = await firstValueFrom(this.queryService.getUserTickets(this.user!.toString())) as Ticket[];
    this.agingTickets.data = await firstValueFrom(this.queryService.getUserAgingTickets(this.user!.toString())) as Ticket[];
  }

  logout() {}

  openDialogView(ticket: any) {}

  openDialogUpdate(ticket: any) {}

}
