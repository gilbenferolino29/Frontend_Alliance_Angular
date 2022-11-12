import {Injectable} from '@angular/core'
import { environment } from 'src/environments/environment'


@Injectable()
export class GlobalConstants {

    constructor(){}

    //Server Url
    public static server_url = environment.apiUrl + '/';


    //
}