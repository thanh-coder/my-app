import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HomeLoginComponent } from '../../../feature/article/home-login/home-login.component';

@Injectable()
export class AccessGuard implements CanDeactivate<HomeLoginComponent> {
  canDeactivate():boolean {
    return false;

  }
}
