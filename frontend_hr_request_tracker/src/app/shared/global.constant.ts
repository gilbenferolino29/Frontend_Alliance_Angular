import {Injectable} from '@angular/core'
import { environment } from 'src/environments/environment'


@Injectable()
export class GlobalConstants {

    constructor(){}

    //Server Url
    public static server_url = environment.apiUrl + '/';


    //TICKET URLS
        //GET
    public static ticketInfo = "ticket/";
    public static allTickets = "tickets/";
        //POST
    public static createTicket = "tickets/create/";
    public static updateTicket = "tickets/update/";
        //DELETE
    public static deleteTicket = "tickets/delete/";

    //TICKET TYPE URLS
        //GET
    public static ticketTypeInfo = "tickets-type/";
    public static allTicketTypes = "ticket-types/";
    
    //USER URLS
        //GET
    public static userInfo = "user/";
    public static allUsers = "users/";

    //STATUS URLS
        //GET
    public static statusInfo = "status/";
    public static status = "status/";
}