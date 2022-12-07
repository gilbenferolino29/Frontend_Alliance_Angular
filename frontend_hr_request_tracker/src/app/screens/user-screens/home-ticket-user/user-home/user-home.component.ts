import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, tap } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';
import { CreateTicketComponentDialog } from '../../create-ticket/create-ticket.component';
import { DeleteTicketComponent } from '../../delete-ticket/delete-ticket.component';
import { UpdateTicketComponent } from '../../update-ticket/update-ticket.component';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'status', 'subject', 'createdAt', 'view', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>;

  pageIndex: number = 0;
  pageSize: number = 8;
  count: number = 0;

  user = localStorage.getItem('user');
  role = localStorage.getItem('role');

  isLoading = true;

  csvHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json; charset=UTF-8'
    }),
    responseType: 'text',
  };

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog, 
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTickets(this.pageIndex, this.pageSize);
  }
  
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  getAllTickets(page: number, size: number) {
    this.isLoading = true;
    this.queryService.getAllTickets(page, size).pipe(tap((res: any) => {
      this.isLoading = false;
      this.dataSource.data = res.content;
      this.count = res.totalElements;
    })).subscribe();
  }

  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllTickets(event.pageIndex, event.pageSize);
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateTicketComponentDialog, {
      height: '350px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data != null) {
        this.getAllTickets(this.pageIndex, this.pageSize);
        this.openSnackbar('Ticket created.', 'Dismiss');
      }
    });
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
        const index = this.dataSource.data.findIndex(x => x.ticketID === result.data.ticketID);
        this.dataSource.data[index] = result.data;
        this.dataSource._updateChangeSubscription();
        this.openSnackbar('Ticket updated.', 'Dismiss');
      }
    });
  }

  openDialogDelete(ticket: Ticket) {
    const dialogRef = this.dialog.open(DeleteTicketComponent, {
      data: {
        ticket: ticket,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data == true) {
        this.getAllTickets(this.pageIndex, this.pageSize);
        this.openSnackbar('Ticket deleted.', 'Dismiss');
      }
    });
  }

  exportAllTicketsCsv() {
    this.queryService.exportAllTickets(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'tickets.csv';
      link.click();
    });
  }

  exportAgingCategoryCsv() {
    this.queryService.exportAllAgingCategory(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'aging_by_category.csv';
      link.click();
    });
  }

  exportCategoryCountCsv() {
    this.queryService.exportCountCategory(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'count_category.csv';
      link.click();
    });
  }

  exportUserCountCsv() {
    this.queryService.exportCountUser(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'count_user.csv';
      link.click();
    });
  }

  isAuthorized(ticket: Ticket) {
    if(ticket.assignee.userID.toString() == this.user || this.role == "ADMIN") {
      return true;
    }
    return false;
  }

  openSnackbar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 3000
    });
  }

  search(event: Event): void{
    const searchTerm = (event.target as HTMLInputElement).value;
  }
}
