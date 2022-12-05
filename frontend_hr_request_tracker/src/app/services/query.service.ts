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
  public exportAllAgingCategory(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allAgingByCategory, httpOptions);
  }
  public exportCountCategory(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allCategoryCount, httpOptions);
  }

  public createTicketType(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.createTicketType, data);
  }
  public updateTicketType(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateTicketType, data);
  }

  public deleteTicketType(id: string) {
    return this.httpService.delete(GlobalConstants.server_url + GlobalConstants.deleteTicketType + id);
  }

  //USER REQUESTS
  public getUserInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.userInfo + id);
  }

  public getAllUsers(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allUsers);
  }

  public createUser(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.createUser, data);
  }

  public updateUser(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateUser, data);
  }

  public deleteUser(id: string) {
    return this.httpService.delete(GlobalConstants.server_url + GlobalConstants.deleteUser + id);
  }

  //STATUS REQUESTS
  public getStatusInfo(id:string){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.statusInfo + id);
  }
  public getAllStatus(){
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allStatus);
  }

  //ROLE REQUESTS
  public getAllRoles() {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.allRoles);
  }

  public createRole(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.createRole, data);
  }

  public updateRole(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateRole, data);
  }

  public deleteRole(id: string) {
    return this.httpService.delete(GlobalConstants.server_url + GlobalConstants.deleteRole + id);
  }
  

}
