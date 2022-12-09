import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Status } from 'src/app/models/IStatus';
import { Ticket } from 'src/app/models/ITicket';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';
import { UpdateTicketComponent } from '../../common/modals/update-ticket/update-ticket.component';
import { ViewTicketComponent } from '../../common/modals/view-ticket/view-ticket.component';
import { CreateTicketComponentDialog } from '../../user-screens/create-ticket/create-ticket.component';
import { DeleteTicketComponent } from '../../user-screens/delete-ticket/delete-ticket.component';

@Component({
  selector: 'app-all-aging-tickets',
  templateUrl: './all-aging-tickets.component.html',
  styleUrls: ['./all-aging-tickets.component.scss']
})
export class AllAgingTicketsComponent implements OnInit {
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

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTickets(this.pageIndex, this.pageSize, this.active, this.direction);
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  getAllTickets(page: number, size: number, active: any, direction: any) {
    this.isLoading = true;
    this.queryService.getAllAgingTickets(page, size, active, direction).pipe(tap((res: any) => {
      this.isLoading = false;
      this.dataSource.data = res.content;
      this.count = res.totalElements;

      console.log(res.content);
    })).subscribe();
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

  openSnackbar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 3000
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

}
