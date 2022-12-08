import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';
import { CreateTicketComponentDialog } from '../../create-ticket/create-ticket.component';
import { DeleteTicketComponent } from '../../delete-ticket/delete-ticket.component';
import { UpdateTicketComponent } from '../../../common/modals/update-ticket/update-ticket.component';
import { ViewTicketComponent } from '../../../common/modals/view-ticket/view-ticket.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { Status } from 'src/app/models/IStatus';
import { User } from 'src/app/models/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['ticketID', 'tracker', 'status', 'subject', 'assignee', 'createdAt', 'view', 'update', 'delete', 'action'];
  public dataSource = new MatTableDataSource<Ticket>;

  pageIndex: number = 0;
  pageSize: number = 8;
  count: number = 0;
  active: any = '';
  direction: any = '';

  user = localStorage.getItem('user');
  role = localStorage.getItem('role');

  isLoading = true;

  statusList: any = [];
  assigneeList: any = [];

  statusFilter: any;

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
  ) { 
  }

  ngOnInit(): void {
    if(this.role != 'ADMIN') {
      this.displayedColumns.splice(9, 1);
    }
    this.getAllTickets(this.pageIndex, this.pageSize, '', '');
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
  
  getAllTickets(page: number, size: number, active: any, direction: any) {
    this.isLoading = true;
    if(!this.statusFilter) {
      this.queryService.getAllTickets(page, size, active, direction).pipe(tap((res: any) => {
        this.isLoading = false;
        this.dataSource.data = res.content;
        this.count = res.totalElements;
      })).subscribe();
    } else {
      this.queryService.getAllTicketsByStatus(this.statusFilter, page, size, active, direction).pipe(tap((res: any) => {
        this.isLoading = false;
        this.dataSource.data = res.content;
        this.count = res.totalElements;
      })).subscribe();
    }
  }

  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
  }

  sortData(event: any) {
    this.active = event.active;
    this.direction = event.direction;
    this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateTicketComponentDialog, {
      height: '350px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data != null) {
        this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
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
        this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
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
        this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
        this.openSnackbar('Ticket deleted.', 'Dismiss');
      }
    });
  }

  getStatus() {
    if(this.statusList.length <= 0) {
      this.queryService.getAllStatus().subscribe(res => {
        this.statusList = res;
      });
    }
  }

  changeStatus(status: Status, ticket: Ticket) {
    if(status.statusID != ticket.status.statusID) {
      let formData: FormData = new FormData();
      let ticketID = ticket.ticketID.toString();
    
      formData.append('status', status.statusID.toString());
  
      this.queryService.updateStatus(ticketID, formData).subscribe((res: any) => {
        if(res.data != null) {
          this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
          this.openSnackbar('Status updated.', 'Dismiss');
        }
      });
    }
  }

  filterStatus(event: any) {
    this.pageIndex = 0;
    this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
  }

  getAssignees() {
    if(this.assigneeList.length <= 0) {
      this.queryService.getAllUsers().subscribe(res => {
        this.assigneeList = res;
      });
    }
  }

  changeAssignee(assignee: User, ticket: Ticket) {
    if(assignee.userID != ticket.assignee.userID) {
      let formData: FormData = new FormData();
      let ticketID = ticket.ticketID.toString();
  
      formData.append('assignee', assignee.userID.toString());
  
      this.queryService.updateAssignee(ticketID, formData).subscribe((res: any) => {
        if(res.data != null) {
          this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
          this.openSnackbar('Assignee updated.', 'Dismiss');
        }
      });
    }
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
