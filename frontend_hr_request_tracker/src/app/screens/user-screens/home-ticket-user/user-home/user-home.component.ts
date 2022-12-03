import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';
import { DeleteTicketComponent } from '../../delete-ticket/delete-ticket.component';


@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'status', 'subject', 'description', 'createdAt', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>;
  tickets: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService,
    public dialog: MatDialog, 
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

   update(ticket: Ticket) {
    this.queryService.updateTicket(ticket);
    window.location.reload();
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
      }
    });
  }

  search(event: Event): void{
    const searchTerm = (event.target as HTMLInputElement).value;
  }
}
