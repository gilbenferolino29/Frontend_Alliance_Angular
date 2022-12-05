import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-create-tracker',
  templateUrl: './create-tracker.component.html',
  styleUrls: ['./create-tracker.component.scss']
})
export class CreateTrackerComponent implements OnInit {
  assigneeList: any = [];

  typeName: any;
  description: any;
  defaultAssignee: any;

  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateTrackerComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  createTracker() {
    let formData: FormData = new FormData();

    formData.append('typeName', this.typeName.toString());
    formData.append('description', this.description != null ? this.description.toString() : '');
    formData.append('defaultAssignee', this.defaultAssignee.toString());

    this.queryService.createTicketType(formData).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  selectAssignee(assignee: any, event: any) {
    if(event.isUserInput) {
      this.defaultAssignee = assignee;
    }
  }
}
