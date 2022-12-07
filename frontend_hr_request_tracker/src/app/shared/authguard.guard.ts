import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { QueryService } from '../services/query.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate, CanLoad {
  constructor(public queryService: QueryService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const user = localStorage.getItem('user') || 0;
  
    var isAuthenticated = this.queryService.authenticate(user.toString()).pipe(map(result => {
      if(result == null) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }));

    return isAuthenticated;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
