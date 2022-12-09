import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-report-user-count',
  templateUrl: './report-user-count.component.html',
  styleUrls: ['./report-user-count.component.scss']
})
export class ReportUserCountComponent implements OnInit {
  public displayedColumns = ['assigneeID', 'user', 'ticketCount'];
  public dataSource = new MatTableDataSource<any>;

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
    this.queryService.getAllCountUser().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  exportUserCountCsv() {
    this.queryService.exportCountUser(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'count_user.csv';
      link.click();
    });
  }

}
