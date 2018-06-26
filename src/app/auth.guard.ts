import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private user: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.auth.getLoginStatus().pipe(map( status => {
        if(status) {
          return true;
        }
      }));
      return this.user.isLoggedIn().pipe(map( res => {
        if(res.status){
          this.auth.setLoginStatus(true);
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }));

  }
}
