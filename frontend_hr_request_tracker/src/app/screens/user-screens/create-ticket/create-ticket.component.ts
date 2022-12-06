import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.group({
    subject: ['', [Validators.required]],
    description: [''],
    assignee: ['', [Validators.required]],
    tracker: ['', [Validators.required]],
    status: ['', [Validators.required]],
    file: [''],
    fileName: ['']
  });

  assigneeUserSelected: any = false;

  constructor(private queryService: QueryService, 
    public dialogRef: MatDialogRef<CreateTicketComponentDialog>,
    private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.trackerList = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
    this.statusList = await firstValueFrom(this.queryService.getAllStatus()) as Status[];
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  createTicket() {
    if(this.form.valid) {
      if(this.file.value!) {
        this.uploadFile();
      }

      let formData: FormData = new FormData();
      let createdAt = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
      formData.append('assignee', this.assignee.value!.toString());
      formData.append('tracker', this.tracker.value!.toString());
      formData.append('status', this.status.value!.toString());
      formData.append('subject', this.subject.value!.toString());
      formData.append('description', this.description.value != null ? this.description.value.toString() : '');
      formData.append('createdAt', createdAt.toString());
      formData.append('file', this.fileName.value != null ? this.fileName.value.toString() : '');

      this.queryService.createTicket(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  assigneeSelected(event: any) {
    if(event.isUserInput) {
      this.assigneeUserSelected = true;
    }
  }

  checkDefaultAssignee(tracker: any, event: any) {
    if(event.isUserInput && !this.assigneeUserSelected) {
      this.assignee.setValue(tracker.defaultAssignee[0].userID);
    }
  }

  onFileChanged(event: any) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.file.setValue(file);
      this.fileName.setValue(file.name);
    }
  }

  uploadFile() {
    let fileData: FormData = new FormData();

    fileData.append('file', this.file.value!);
    this.queryService.attachFile(fileData).subscribe();
  }

  get f() {
    return this.form.controls;
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

  get fileName() {
    return this.form.controls.fileName;
  }
}
