import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/global.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) { }

  public login(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.login, data);
  }
  public forgotPassword(email: any) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.forgotPassword + '?email=' + email);
  }
  public resetPassword(id: string, data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.resetPassword + id, data);
  }

  //TOKEN REQUESTS
  public getTokenInfo(id: string) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.tokenInfo + id);
  }
  public authenticate(id: string) {
    return this.httpService.get(GlobalConstants.server_url + GlobalConstants.authenticate + id);
  }
  public generateToken(data: any) {
    return this.httpService.post(GlobalConstants.server_url + GlobalConstants.generateToken, data);
  }
  public deleteToken(id: string) {
    return this.httpService.delete(GlobalConstants.server_url + GlobalConstants.deleteToken + id);
  }
}
