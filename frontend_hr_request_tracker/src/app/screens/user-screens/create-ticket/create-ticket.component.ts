import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Status } from 'src/app/models/IStatus';
import { TicketType } from 'src/app/models/ITicketType';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponentDialog implements OnInit {
  trackerList: any = [];
  statusList: any = [];
  assigneeList: any = [];

  subject: any;
  description: any;
  assignee: any;
  tracker: any;
  status: any;

  constructor(private queryService: QueryService, public dialogRef: MatDialogRef<CreateTicketComponentDialog>) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.trackerList = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
    this.statusList = await firstValueFrom(this.queryService.getAllStatus()) as Status[];
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  createTicket() {
    let formData: FormData = new FormData();
    let createdAt = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    formData.append('assignee', this.assignee.toString());
    formData.append('tracker', this.tracker.toString());
    formData.append('status', this.status.toString());
    formData.append('subject', this.subject.toString());
    formData.append('description', this.description.toString());
    formData.append('createdAt', createdAt.toString());

    this.queryService.createTicket(formData).subscribe();
    this.dialogRef.close(true);
  }

  selectAssignee(assignee: any, event: any) {
    if(event.isUserInput) {
      this.assignee = assignee;
    }
  }

  selectTracker(tracker: any, event: any) {
    if(event.isUserInput) {
      this.tracker = tracker;
    }
  }

  selectStatus(status: any, event: any) {
    if(event.isUserInput) {
      this.status = status;
    }
  }
}
