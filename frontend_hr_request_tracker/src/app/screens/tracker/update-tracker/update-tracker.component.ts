import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { TicketType } from 'src/app/models/ITicketType';
import { User } from 'src/app/models/IUser';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-update-tracker',
  templateUrl: './update-tracker.component.html',
  styleUrls: ['./update-tracker.component.scss']
})
export class UpdateTrackerComponent implements OnInit {
  assigneeList: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateTrackerComponent>
    ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  updateTracker(tracker: TicketType) {
    let formData: FormData = new FormData();

    formData.append('ticketTypeID', tracker.ticketTypeID.toString());
    formData.append('typeName', tracker.typeName.toString());
    formData.append('description', tracker.description != null ? tracker.description.toString() : '');
    formData.append('defaultAssignee', this.data['tracker'].defaultAssignee[0].userID.toString());

    this.queryService.updateTicketType(formData).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  selectAssignee(assignee: any, event: any) {
    if(event.isUserInput) {
      this.data['tracker'].defaultAssignee[0] = assignee;
    }
  }

}
