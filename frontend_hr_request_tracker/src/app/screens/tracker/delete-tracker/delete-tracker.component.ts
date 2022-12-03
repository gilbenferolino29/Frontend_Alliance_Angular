import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketType } from 'src/app/models/ITicketType';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-delete-tracker',
  templateUrl: './delete-tracker.component.html',
  styleUrls: ['./delete-tracker.component.scss']
})
export class DeleteTrackerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService, public dialogRef: MatDialogRef<DeleteTrackerComponent>
    ) { }

  ngOnInit(): void {
  }

  deleteTracker(tracker: TicketType) {
    this.queryService.deleteTicketType(tracker.ticketTypeID.toString()).subscribe();
    this.dialogRef.close(true);
  }

}
