import { Ticket } from "./ITicket";

export interface Status{
    statusID: number;
    statusName: String;
    description: String;
    tickets: Ticket[];

}