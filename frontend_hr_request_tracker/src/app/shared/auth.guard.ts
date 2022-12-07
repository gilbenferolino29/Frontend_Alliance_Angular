import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { QueryService } from '../services/query.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public queryService: QueryService, 
    public authService: AuthService,
    public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    let url: string = state.url;

    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): Observable<boolean> {
    const user = localStorage.getItem('user') || 0;
    const role = localStorage.getItem('role') || '';

    console.log(role);

    var isAuthenticated = this.authService.authenticate(user.toString()).pipe(map(result => {
      if(result != null) {
        if(route.data['role'] && route.data['role'] != role) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }));

    return isAuthenticated;
  }
  
}
