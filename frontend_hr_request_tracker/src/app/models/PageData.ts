export class PageData {
    index: number;
    size: number;
    count: number;
    active: string;
    direction: string;
    search: any;
    filter: any;

    constructor(index: number, size: number, count: number, active: string, direction: string, search: any, filter: any) {
        this.index = index;
        this.size = size;
        this.count = count;
        this.active = active;
        this.direction = direction;
        this.search = search;
        this.filter = filter;
    }
}