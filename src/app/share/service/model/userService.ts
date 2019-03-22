import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'
import { AccessTokenService } from '../tokenService/access-token.service'
import { ApiService } from '../lib/api.service'
import { config } from '../config/config-service'
import { async } from '@angular/core/testing';

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
    console.log(this.accessToken.token)
    return this.apiService.GET(`user`).toPromise();
  }

  getProfile(username) {
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
    return this.apiService.UPDATE('user', user1)
  }

  ngOnint() { }
  
}
