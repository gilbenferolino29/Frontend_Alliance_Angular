import { BuiltinTypeName } from "@angular/compiler";
import { Ticket } from "./ITicket";
import { User } from "./IUser";

export interface TicketType{
    ticketTypeID: number;
    typeName: string;
    description: string;
    tickets: Ticket[];
    defaultAssignee: User;
}