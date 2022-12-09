import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-report-aging',
  templateUrl: './report-aging.component.html',
  styleUrls: ['./report-aging.component.scss']
})
export class ReportAgingComponent implements OnInit {
  public displayedColumns = ['ticketID', 'tracker', 'status', 'subject', 'assignee', 'createdAt'];
  public dataSource = new MatTableDataSource<Ticket>;

  csvHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json; charset=UTF-8'
    }),
    responseType: 'text',
  };

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.queryService.getAllAgingByCategory().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  exportAgingCategoryCsv() {
    this.queryService.exportAllAgingCategory(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'aging_by_category.csv';
      link.click();
    });
  }

}
