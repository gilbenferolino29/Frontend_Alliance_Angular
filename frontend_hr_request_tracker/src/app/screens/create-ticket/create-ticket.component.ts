import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  assignees: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService,
  ) { }

  async ngOnInit(): Promise<void> {
   await this.populate();
   console.log(this.assignees);
  }
  


  nav(url: string) {
    this.router.navigate([url]);
  }

  async populate(){
    this.assignees = await firstValueFrom(this.queryService.getAllUsers());
    
  }

}
