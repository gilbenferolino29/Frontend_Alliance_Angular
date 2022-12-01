import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Ticket } from 'src/app/models/ITicket';
import { QueryService } from 'src/app/services/query.service';


@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  showFiller = false;
  public displayedColumns = ['ticketID', 'assignee', 'tracker', 'status', 'subject', 'description', 'createdAt', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ticket>;
  tickets: any = [];

  constructor(
    private router: Router,
    private queryService: QueryService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.populate();
    console.log(this.dataSource.data);
   
  }
  
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async populate(){
    this.dataSource.data = await firstValueFrom(this.queryService.getAllTickets()) as Ticket[]; 
  }

   update(ticket: Ticket) {
    this.queryService.updateTicket(ticket);
    window.location.reload();
  }

   delete (ticket:Ticket){
     this.queryService.deleteTicket(ticket.ticketID.toString()).subscribe((res)=>{
      console.log(res);
      alert(`${ticket.ticketID} successfully deleted`);
      const index = this.dataSource.data.findIndex(x => x.ticketID === ticket.ticketID);
      console.log(index);
      this.dataSource.data.splice(index,1)
      this.dataSource._updateChangeSubscription();
      
      });

    }
    
  

  search(event: Event): void{
    const searchTerm = (event.target as HTMLInputElement).value;
  }
}
