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
    public static createTicketType = "ticket-types/create";
    public static updateTicketType = "ticket-types/update";
    public static deleteTicketType = "ticket-types/delete";
    
    //USER URLS
        //GET
    public static userInfo = "user/";
    public static allUsers = "users/";
    public static createUser = "users/create/";
    public static updateUser = "users/update.";
    public static deleteUser = "users/delete/"

    //STATUS URLS
        //GET
    public static statusInfo = "status/";
    public static allStatus = "status/";

    //ROLE URLS
        //GET
    public static allRoles = "roles/";
    public static createRole = "roles/create/";
    public static updateRole = "roles/update/";
    public static deleteRole = "roles/delete/";
}