import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, public accessToken: AccessTokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser') && this.accessToken.token) {
      return true
    } else {
      this.router.navigate(['login'])
      return false;
    }
  }
}
