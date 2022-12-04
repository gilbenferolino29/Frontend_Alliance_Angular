import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';
import { CreateTicketComponentDialog } from '../../create-ticket/create-ticket.component';
import { DeleteTicketComponent } from '../../delete-ticket/delete-ticket.component';
import { UpdateTicketComponent } from '../../update-ticket/update-ticket.component';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'subject', 'description', 'status', 'createdAt', 'view', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>;
  tickets: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog, 
    private _snackbar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
    console.log(this.dataSource.data);
   
  }
  
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate(){
    this.dataSource.data = await firstValueFrom(this.queryService.getAllTickets()) as Ticket[]; 
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateTicketComponentDialog, {
      height: '350px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
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
      if(result == true) {
        window.location.reload();
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
      if(result == true) {
        const index = this.dataSource.data.findIndex(x => x.ticketID === ticket.ticketID);
        this.dataSource.data.splice(index,1)
        this.dataSource._updateChangeSubscription();

        this.openSnackbar('Ticket deleted.', 'Dismiss');
      }
    });
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
