import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-report-category-count',
  templateUrl: './report-category-count.component.html',
  styleUrls: ['./report-category-count.component.scss']
})
export class ReportCategoryCountComponent implements OnInit {
  public displayedColumns = ['trackerID', 'tracker', 'ticketCount'];
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
    this.queryService.getAllCountCategory().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  exportCategoryCountCsv() {
    this.queryService.exportCountCategory(this.csvHttpOptions).subscribe(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any], {type: 'text/csv'}));
      link.download = 'count_category.csv';
      link.click();
    });
  }
}
