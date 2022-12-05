import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  
  form = this.fb.group({
    typeName: ['', [Validators.required]],
    description: [''],
    defaultAssignee: ['', [Validators.required]]
  });

  constructor(
    private queryService: QueryService,
    public dialogRef: MatDialogRef<CreateTrackerComponent>,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  async populate() {
    this.assigneeList = await firstValueFrom(this.queryService.getAllUsers()) as User[];
  }

  createTracker() {
    if(this.form.valid) {
      let formData: FormData = new FormData();

      formData.append('typeName', this.typeName.value!.toString());
      formData.append('description', this.description.value != null ? this.description.value.toString() : '');
      formData.append('defaultAssignee', this.defaultAssignee.value!.toString());
  
      this.queryService.createTicketType(formData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
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
