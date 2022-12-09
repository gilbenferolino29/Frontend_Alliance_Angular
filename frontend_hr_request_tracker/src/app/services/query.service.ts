import { Injectable } from '@angular/core';
import { PageData } from '../models/PageData';
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
  
  public getAllTickets(pageData: PageData){
    var url = GlobalConstants.server_url + 
      GlobalConstants.allTickets + '?page=' + pageData.index + '&size=' + pageData.size  + 
      '&sort=' + pageData.active + ',' + pageData.direction;

    if(pageData.filter != null) {
      url += '&filter=' + pageData.filter;
    }

    if(pageData.search != null) {
      url += '&search=' + pageData.search;
    }

    return this.httpService.get(url);
  }
  
  public getUserTickets(id: string, page: number, size: number, active: any, direction: any) {
    return this.httpService.get(GlobalConstants.server_url + 
      GlobalConstants.userTickets + id + '?page=' + page + '&size=' + size  + '&sort=' + active + ',' + direction);
  }

  public getUserAgingTickets(id: string, page: number, size: number, active: any, direction: any) {
    return this.httpService.get(GlobalConstants.server_url + 
      GlobalConstants.userAgingTickets + id + '?page=' + page + '&size=' + size  + '&sort=' + active + ',' + direction);
  }

  public getAllAgingTickets(page: number, size: number, active: any, direction: any) {
    return this.httpService.get(GlobalConstants.server_url + 
      GlobalConstants.allAgingTickets + '?page=' + page + '&size=' + size  + '&sort=' + active + ',' + direction);
  }

  public createTicket(data:any){
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.createTicket, data);
  }

  public updateTicket(data:any){
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateTicket, data);
  }

  public updateAssignee(id: string, data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateAssignee + id, data);
  }

  public updateStatus(id: string, data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.updateStatus + id, data);
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
  public exportAllTickets(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.exportAllTickets, httpOptions);
  }
  public exportAllAgingCategory(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.exportAgingByCategory, httpOptions);
  }
  public exportCountCategory(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.exportCategoryCount, httpOptions);
  }
  public exportCountUser(httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.exportUserCount, httpOptions);
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

  //FILE REQUESTS
  public attachFile(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.attachFile, data);
  }
  public viewFile(id: string, httpOptions: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.viewFile + id, httpOptions);
  }
}
