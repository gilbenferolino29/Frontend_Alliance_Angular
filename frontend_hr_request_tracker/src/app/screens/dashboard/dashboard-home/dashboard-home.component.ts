import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'status', 'subject', 'createdAt', 'view', 'update'];
  public userTickets = new MatTableDataSource<Ticket>;
  public agingTickets = new MatTableDataSource<Ticket>;
  public user = localStorage.getItem('user');

  ticketsPageIndex = 0;
  ticketsPageSize = 5;
  ticketsCount = 0;
  isTicketsLoading = true;

  agingPageIndex = 0;
  agingPageSize = 5;
  agingCount = 0;
  isAgingLoading = true;

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUserTickets(this.ticketsPageIndex, this.ticketsPageSize);
    this.getAgingTickets(this.agingPageIndex, this.agingPageSize);
  }

  getUserTickets(page: number, size: number) {
    this.isTicketsLoading = true;
    this.queryService.getUserTickets(this.user!.toString(), page, size).pipe(tap((res: any) => {
      this.isTicketsLoading = false;
      this.userTickets.data = res.content;
      this.ticketsCount = res.totalElements;
    })).subscribe();
  }

  changeTicketPage(event: any) {
    this.ticketsPageIndex = event.pageIndex;
    this.ticketsPageSize = event.pageSize;
    this.getUserTickets(event.pageIndex, event.pageSize);
  }

  getAgingTickets(page: number, size: number) {
    this.isAgingLoading = true;
    this.queryService.getUserAgingTickets(this.user!.toString(), page, size).pipe(tap((res: any) => {
      this.isAgingLoading = false;
      this.agingTickets.data = res.content;
      this.agingCount = res.totalElements;
    })).subscribe();
  }

  changeAgingPage(event: any) {
    this.agingPageIndex = event.pageIndex;
    this.agingPageSize = event.pageSize;
    this.getAgingTickets(event.pageIndex, event.pageSize);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  openDialogView(ticket: any) {}

  openDialogUpdate(ticket: any) {}

}
