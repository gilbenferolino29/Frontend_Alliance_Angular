import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/global.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpService: HttpService) { }


  //TICKET REQUESTS
  public getTicketInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.ticketInfo + id);
  }
  
  public getAllTickets(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allTickets);
  }

  public createTicket(data:any){
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.createTicket, data);
  }

  public updateTicket(data:any){
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateTicket, data);
  }

  public deleteTicket(id:string){
    return this.httpService.delete(GlobalConstants.server_url + GlobalConstants.deleteTicket + id);
  }

  //TICKET TYPE REQUESTS
  public getTicketTypeInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.ticketTypeInfo + id);
  }
  public getAllTicketTypes(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allTicketTypes)
  }

  //USER REQUESTS
  public getUserInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.userInfo + id);
  }

  public getAllUsers(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allUsers );
  }

  //STATUS REQUESTS
  public getStatusInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.statusInfo + id);
  }
  public getAllStatus(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allStatus);
  }
  

}
