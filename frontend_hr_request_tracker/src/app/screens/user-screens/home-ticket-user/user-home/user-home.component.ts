import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  tickets: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.populate();
  }
  
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  populate(){
    this.queryService.getAllTickets().subscribe(next=>{
      this.tickets = next;
      console.log(this.tickets);
    })
  }
}
