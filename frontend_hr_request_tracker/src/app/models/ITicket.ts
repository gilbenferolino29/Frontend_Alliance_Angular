import { User } from "./IUser";
import { TicketType } from "./ITicketType";
import { Status } from "./IStatus";
export interface Ticket {
    ticketID: number;
    assignee: User;
    tracker: TicketType;
    status: Status;
    file: File;
    subject: String;
    description: String;
    createdAt: Array<any>;
}