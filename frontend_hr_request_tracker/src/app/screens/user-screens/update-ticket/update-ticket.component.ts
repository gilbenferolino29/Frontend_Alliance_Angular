import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Status } from 'src/app/models/IStatus';
import { Ticket } from 'src/app/models/ITicket';
import { TicketType } from 'src/app/models/ITicketType';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  trackerList: any = [];
  statusList: any = [];
  assigneeList: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService, public dialogRef: MatDialogRef<UpdateTicketComponent>) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.trackerList = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
    this.statusList = await firstValueFrom(this.queryService.getAllStatus()) as Status[];
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  updateTicket(ticket: Ticket) {
    let formData: FormData = new FormData();
    let createdAt = ticket.createdAt[0] + '-' + String(ticket.createdAt[1]).padStart(2, '0') + '-' + String(ticket.createdAt[2]).padStart(2, '0');
    formData.append('ticketID', ticket.ticketID.toString());
    formData.append('assignee', ticket.assignee.userID.toString());
    formData.append('tracker', ticket.tracker.ticketTypeID.toString());
    formData.append('status', ticket.status.statusID.toString());
    formData.append('subject', ticket.subject.toString());
    formData.append('description', ticket.description.toString());
    formData.append('createdAt', createdAt.toString());

    this.queryService.updateTicket(formData).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  compareTracker(dataTracker: any, optionTracker: any): boolean {
    return dataTracker.ticketTypeID === optionTracker.ticketTypeID;
  }

  compareStatus(dataStatus: any, optionStatus: any): boolean {
    return dataStatus.statusID === optionStatus.statusID;
  }

  compareAssignee(dataAssignee: any, optionAssignee: any): boolean {
    return dataAssignee.userID === optionAssignee.userID;
  }

  selectAssignee(assignee: any, event: any) {
    if(event.isUserInput) {
      this.data['ticket'].assignee = assignee;
    }
  }

  selectTracker(tracker: any, event: any) {
    if(event.isUserInput) {
      this.data['ticket'].tracker = tracker;
    }
  }

  selectStatus(status: any, event: any) {
    if(event.isUserInput) {
      this.data['ticket'].status = status;
    }
  }
}
