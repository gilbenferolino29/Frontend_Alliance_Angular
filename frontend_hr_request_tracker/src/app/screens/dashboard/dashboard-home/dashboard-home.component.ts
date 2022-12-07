import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';
import { UpdateTicketComponent } from '../../common/modals/update-ticket/update-ticket.component';
import { ViewTicketComponent } from '../../common/modals/view-ticket/view-ticket.component';

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

      console.log(this.userTickets.data);
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

  openDialogView(ticket: Ticket) {
    this.dialog.open(ViewTicketComponent, {
      data: {
        ticket: ticket,
      },
      height: '350px',
      width: '800px',
    });
  }

  openDialogUpdate(ticket: Ticket) {
    const dialogRef = this.dialog.open(UpdateTicketComponent, {
      data: {
        ticket: ticket,
      },
      height: '350px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data != null) {
        const index = this.userTickets.data.findIndex(x => x.ticketID === result.data.ticketID);
        this.userTickets.data[index] = result.data;
        this.userTickets._updateChangeSubscription();

        const agingIndex = this.agingTickets.data.findIndex(x => x.ticketID === result.data.ticketID);
        if(agingIndex != -1) {
          this.agingTickets.data[agingIndex] = result.data;
          this.agingTickets._updateChangeSubscription();
        }

        this.openSnackbar('Ticket updated.', 'Dismiss');
      }
    });
  }

  openSnackbar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 3000
    });
  }

}
