import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.group({
    ticketID: [{value: this.data['ticket'].ticketID, disabled: true}, [Validators.required]],
    subject: [this.data['ticket'].subject, [Validators.required]],
    description: [this.data['ticket'].description],
    assignee: [this.data['ticket'].assignee.userID, [Validators.required]],
    tracker: [this.data['ticket'].tracker.ticketTypeID, [Validators.required]],
    status: [this.data['ticket'].status.statusID, [Validators.required]],
    file: [this.data['ticket'].file != null ? this.data['ticket'].file.fileID : '']
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService, 
    public dialogRef: MatDialogRef<UpdateTicketComponent>,
    private fb: FormBuilder
    ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.trackerList = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
    this.statusList = await firstValueFrom(this.queryService.getAllStatus()) as Status[];
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  updateTicket(ticket: Ticket) {
    if(this.form.valid) {
      let formData: FormData = new FormData();
      let createdAt = ticket.createdAt[0] + '-' + String(ticket.createdAt[1]).padStart(2, '0') + '-' + String(ticket.createdAt[2]).padStart(2, '0');
      formData.append('ticketID', ticket.ticketID.toString());
      formData.append('assignee', this.assignee.value!.toString());
      formData.append('tracker', this.tracker.value!.toString());
      formData.append('status', this.status.value!.toString());
      formData.append('subject', this.subject.value!.toString());
      formData.append('description', this.description.value != null ? this.description.value.toString() : '');
      formData.append('file', this.file.value != null ? this.file.value.toString() : '');
      formData.append('createdAt', createdAt.toString());
  
      this.queryService.updateTicket(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile() {
    let fileData: FormData = new FormData();

    fileData.append('file', this.file.value!);

    this.queryService.attachFile(fileData).subscribe((res: any) => {
      this.file.setValue(res.data.fileID);
      this.updateTicket(this.data['ticket']);
    });
  }

  onFileChanged(event: any) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.file.setValue(file);
    }
  }

  get f() {
    return this.form.controls;
  }

  get ticketID() {
    return this.form.controls.ticketID;
  }

  get subject() {
    return this.form.controls.subject;
  }

  get description() {
    return this.form.controls.description;
  }

  get assignee() {
    return this.form.controls.assignee;
  }

  get tracker() {
    return this.form.controls.tracker;
  }

  get status() {
    return this.form.controls.status;
  }

  get file() {
    return this.form.controls.file;
  }
}
