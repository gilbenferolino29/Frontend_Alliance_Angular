import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TicketType } from 'src/app/models/ITicketType';
import { QueryService } from 'src/app/services/query.service';

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
    console.log(this.dataSource.data);
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate() {
    this.dataSource.data = await firstValueFrom(this.queryService.getAllTicketTypes()) as TicketType[];
  }

}
