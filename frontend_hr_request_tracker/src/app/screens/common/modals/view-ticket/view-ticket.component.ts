import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    
  }

  viewFile(file: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8'
      }),
      responseType: 'text',
    };
    this.queryService.viewFile(file.fileID.toString(), httpOptions).subscribe((res: any) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res as any]));
      link.download = this.data['ticket'].file.fileName;
      link.click();
    });
  }
}
