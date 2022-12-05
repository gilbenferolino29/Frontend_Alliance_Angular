import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }



  //HTTP GET
  public get (url:string, httpOptions?: any){
    return httpOptions !== null ? this.http.get(url, httpOptions) : this.http.get(url);
  }
  //HTTP POST
  public post (url: string, data:any){
    return this.http.post(url,data);
  }
  //HTTP DELETE
  public delete(url:string){
    return this.http.delete(url);
  }
  //HTTP PATCH
  public patch (url:string, data:any){
    return this.http.patch(url,data);
  }
}
