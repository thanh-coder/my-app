import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AccessTokenService } from '../tokenService/access-token.service'

import { ApiService } from '../lib/api.service'
import { config } from '../config/config-service'
import { async } from '@angular/core/testing';

var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class Service {
  public acounts: object;
  public user: User = new User();
  public token: any;

  constructor(
    public apiService: ApiService,
    public accessToken: AccessTokenService

  ) { }

  signUp(acount: any): Observable<any> {
    console.log(acount);
    console.log(httpOptions);
    let object: any = {
      "user": {
        "username": acount.username,
        "email": acount.email,
        "password": acount.password
      }
    }
    return this.apiService.POST(`users`, object)
  }

  signIn(user: any): Promise<any> {
    let object: any = {
      "user": {
        "email": user.email,
        "password": user.password
      }
    }
    return this.apiService.POST(`users/login`, object).toPromise();
  }

  getUser() {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    console.log(this.accessToken.token)
    return this.apiService.GET(`user`).toPromise();
  }

  getProfile(username) {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.GET(`profiles/${username}`).toPromise();
  }

  updateProfile(user: any): Observable<any> {
    let user1 = {
      "user": {
        "image": user.image,
        "email": user.email,
        "bio": user.bio
      }
    }
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.UPDATE('user', user1)
  }

  ngOnint() { }
}
