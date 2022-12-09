import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { PageData } from 'src/app/models/PageData';
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

  defaultPageIndex = 0;
  defaultPageSize = 5;
  defaultCount = 0;
  defaultActive = '';
  defaultDirection = '';
  defaultSearch = null;
  defaultFilter = null;

  isTicketsLoading = true;
  isAgingLoading = true;

  ticketPageData: PageData = new PageData(this.defaultPageIndex, this.defaultPageSize, 
    this.defaultCount, this.defaultActive, this.defaultDirection, this.defaultSearch, this.defaultFilter);
  
  agingPageData: PageData = new PageData(this.defaultPageIndex, this.defaultPageSize, 
    this.defaultCount, this.defaultActive, this.defaultDirection, this.defaultSearch, this.defaultFilter);

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUserTickets();
    this.getAgingTickets();
  }

  getUserTickets() {
    this.isTicketsLoading = true;
    this.queryService.getUserTickets(this.user!.toString(), this.ticketPageData).pipe(tap((res: any) => {
      this.isTicketsLoading = false;
      this.userTickets.data = res.content;
      this.ticketPageData.count = res.totalElements;
    })).subscribe();
  }

  changeTicketPage(event: any) {
    this.ticketPageData.index = event.pageIndex;
    this.ticketPageData.size = event.pageSize;
    this.getUserTickets();
  }

  getAgingTickets() {
    this.isAgingLoading = true;
    this.queryService.getUserAgingTickets(this.user!.toString(), this.agingPageData).pipe(tap((res: any) => {
      this.isAgingLoading = false;
      this.agingTickets.data = res.content;
      this.agingPageData.count = res.totalElements;
    })).subscribe();
  }

  changeAgingPage(event: any) {
    this.agingPageData.index = event.pageIndex;
    this.agingPageData.size = event.pageSize;
    this.getAgingTickets();
  }

  sortAllTickets(event: any) {
    this.ticketPageData.active = event.active;
    this.ticketPageData.direction = event.direction;
    this.getUserTickets();
  }

  sortAgingTickets(event: any) {
    this.agingPageData.active = event.active;
    this.agingPageData.direction = event.direction;
    this.getAgingTickets();
  }

  searchKey(event: any) {
    this.ticketPageData.search = event.target.value ? event.target.value.toLowerCase() : null;
    this.ticketPageData.index = 0;
    this.getUserTickets();
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
