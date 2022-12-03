import { Ticket } from "./ITicket";
import { Role } from "./Role";

export interface User{
    userID: number;
    username: String;
    userFName: String;
    userLName: String;
    userPassword: String;
    userEmail: String;
    tickets: Ticket[];
    userRole: Role;
    
    
}