import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.scss']
})
export class DeleteTicketComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private queryService: QueryService, public dialogRef: MatDialogRef<DeleteTicketComponent>) { }

    ngOnInit(): void {
    }

    deleteTicket (ticket:Ticket){
      this.queryService.deleteTicket(ticket.ticketID.toString()).subscribe(res => {
        this.dialogRef.close(res);
      });
     }

}
