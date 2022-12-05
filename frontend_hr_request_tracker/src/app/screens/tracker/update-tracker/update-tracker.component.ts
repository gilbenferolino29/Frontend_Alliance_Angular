import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  form = this.fb.group({
    ticketTypeID: [this.data['tracker'].ticketTypeID],
    typeName: [this.data['tracker'].typeName, [Validators.required]],
    description: [this.data['tracker'].description],
    defaultAssignee: [this.data['tracker'].defaultAssignee[0].userID, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService,
    public dialogRef: MatDialogRef<UpdateTrackerComponent>,
    private fb: FormBuilder
    ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  updateTracker(tracker: TicketType) {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('ticketTypeID', this.ticketTypeID.value!.toString());
      formData.append('typeName', this.typeName.value!.toString());
      formData.append('description', this.description.value != null ? this.description.value.toString() : '');
      formData.append('defaultAssignee', this.defaultAssignee.value!.toString());
  
      this.queryService.updateTicketType(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }

  get ticketTypeID() {
    return this.form.controls.ticketTypeID;
  }

  get typeName() {
    return this.form.controls.typeName;
  }

  get description() {
    return this.form.controls.description;
  }

  get defaultAssignee() {
    return this.form.controls.defaultAssignee;
  }

}
