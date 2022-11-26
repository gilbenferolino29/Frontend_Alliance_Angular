import { Ticket } from "./ITicket";

export interface User{
    userID: number;
    usernameL: String;
    userFName: String;
    userLName: String;
    password: String;
    email: String;
    tickets: Ticket[];
    
    
}