import { Injectable, OnInit } from '@angular/core';
// import { fakeMovies } from './fake-movies';

//Get data asynchronously with Observable
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
  public acounts: any;
  public data1: any;
  public data: any = {
    image: "https://www.pexels.com/photo/sunglasses-sunset-summer-sand-46710/",
    username: "HungIT",
    describe: "handsome,hoa dong",
    bio: "i dont know",
    password: "",
    email: ""
  };

  public user: User = new User();
  public token: any;

  constructor(
    public apiService: ApiService,
    public accessToken: AccessTokenService

  ) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

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
    this.data = { ...this.data, ...acount };
    // return this.apiService.POST(`${config.userURL}/users`, object, httpOptions)
    return this.apiService.POST(`users`, object, httpOptions)

  }

  signIn(user: any): Promise<any> {
    let object: any = {
      "user": {
        "email": user.email,
        "password": user.password
      }
    }
    this.data = { ...this.data, ...user };
    return this.apiService.POST(`users/login`, object, httpOptions).toPromise();
    // return this.apiService.POST(`${config.userURL}/users/login`, object, httpOptions).toPromise();

  }

  // getUser(){
  //   var httpOptions1 = {
  //     headers:new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.accessToken.token})
  //   }
  //   console.log(this.accessToken.token)
  //   return this.http.get<any>(`${config.userURL}/user`,httpOptions1).toPromise();
  // }
  getProfile(username) {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.GET(`profiles/username`, httpOptions1).toPromise();
    // return this.apiService.GET(`${config.userURL}/profiles/username`, httpOptions1).toPromise();
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
    return this.apiService.UPDATE('', user1, httpOptions1)
  }




  // async getAllUser(user) {
  //   let check:boolean=false;
  //  this.acounts=await this.http.get<any>(config.userURL).toPromise()
  //  console.log(this.acounts)
  //  this.acounts.forEach(item =>{
  //   if(user.email==item.email && user.password==item.password){
  //     check=true;
  //   }else{
  //     check=false
  //   }
  // })
  // return check;
  // }



  ngOnint() {
    // this.getAllUser()
  }
  // loGin(user:User){
  //    this.data={...this.data,...user};
  //    console.log(this.data)
  //   return this.getAllUser(this.data); 
  // }



}
