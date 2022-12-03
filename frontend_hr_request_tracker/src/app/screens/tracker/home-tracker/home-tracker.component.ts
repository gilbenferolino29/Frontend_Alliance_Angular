import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TicketType } from 'src/app/models/ITicketType';
import { QueryService } from 'src/app/services/query.service';
import { CreateTrackerComponent } from '../create-tracker/create-tracker.component';
import { DeleteTrackerComponent } from '../delete-tracker/delete-tracker.component';
import { UpdateTrackerComponent } from '../update-tracker/update-tracker.component';

@Component({
  selector: 'app-home-tracker',
  templateUrl: './home-tracker.component.html',
  styleUrls: ['./home-tracker.component.scss']
})
export class HomeTrackerComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['tracker', 'defaultAssignee', 'description', 'update', 'delete'];
  public dataSource = new MatTableDataSource<TicketType>;
  ticketTypes: any = [];

  constructor(
    private router: Router, 
    private queryService: QueryService,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate() {
    this.dataSource.data = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateTrackerComponent, {
      height: '250px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
      }
    });
  }

  openDialogUpdate(tracker: TicketType) {
    const dialogRef = this.dialog.open(UpdateTrackerComponent, {
      data: {
        tracker: tracker,
      },
      height: '250px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        window.location.reload();
      }
    });
  }

  openDialogDelete(tracker: TicketType) {
    const dialogRef = this.dialog.open(DeleteTrackerComponent, {
      data: {
        tracker: tracker
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        const index = this.dataSource.data.findIndex(x => x.ticketTypeID === tracker.ticketTypeID);
        this.dataSource.data.splice(index,1)
        this.dataSource._updateChangeSubscription();
      }
    });
  }

}
