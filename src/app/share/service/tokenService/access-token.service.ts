import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AccessTokenService {
  public token: string = null;
  public inforUser: object;
  public inforMember: object;
  public check_user:boolean =false;
  public favoriteArticle: number = 0;
  public likeHeart: number[] = [];
  public followUser: number = 0;
  constructor(private router: Router) {
    let currentUser = JSON.parse(this.getLocalStorage('currentUser'));
    if (currentUser != null) {
      this.setToken(currentUser.token)
    }
  }

  public setLocalStorage(item, value) {
    localStorage.setItem(item, value);
  }

  public countFavorite() {
    this.favoriteArticle = this.favoriteArticle + 1;
    return this.favoriteArticle;
  }

  public countdesFavorite() {
    if (this.favoriteArticle == 0) {
      this.favoriteArticle = 0;
    } else {
      this.favoriteArticle = this.favoriteArticle - 1;
    }
    return this.favoriteArticle;
  }

  public countIncFollow(): number {
    this.followUser = this.followUser + 1;
    return this.followUser;
  }

  public countDesFollow() {
    if (this.followUser == 0) {
      this.followUser = 0;
    } else {
      this.followUser -= 1;
    }
    return this.followUser;
  }

  public getLocalStorage(item) {
    return localStorage.getItem(item);
  }

  public setToken(value) {
    this.token = value;
  }

  public getToken() {
    return this.token;
  }

  public logout() {
    if (this.getLocalStorage('currentUser')) {
      this.setToken(null);
      localStorage.removeItem('currentUser');
      this.router.navigate(['login'])
    }
  }

  public checkUser() {
    if (this.getLocalStorage('currentUser')) {
      return true;
    } else {
      this.router.navigate(['login'])
      return false;
    }
  }
}
