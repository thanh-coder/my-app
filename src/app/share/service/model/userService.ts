import { Injectable,OnInit } from '@angular/core';
// import { fakeMovies } from './fake-movies';

//Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {Acount} from '../../models/acount.model'
import {User} from '../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders ,} from '@angular/common/http';
import {AccessTokenService} from '../tokenService/access-token.service'

import {ApiService} from '../lib/api.service'
import {config} from '../config/config-service'
import { async } from '@angular/core/testing';

 var httpOptions = {
    headers:new HttpHeaders({ 'Content-Type': 'application/json'})
 }

@Injectable()
export class Service {
public acounts:any;
public data:any={
  urlImage:"https://www.pexels.com/photo/sunglasses-sunset-summer-sand-46710/",
  name:"HungIT",
  describe:"handsome,hoa dong",
};
public user:User=new User();
 public userURL = 'http://68.183.183.83/api/users';
 public token:any;
//  public userURL = 'http://localhost:3000/user';

constructor(private http: HttpClient, 
            private router: Router,public apiService:ApiService,
            public accessToken:AccessTokenService

  ) { 
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

signUp(acount: any): Observable<any>{
  console.log(acount);
  console.log(httpOptions);
  let object:any ={
    "user":{
    "username":acount.username,
    "email":acount.email,
    "password":acount.password
    }
  }
  return this.apiService.POST(`${config.userURL}/users`,object,httpOptions)

  }

  signIn(user:any):Promise<any>{
      let object:any ={
    "user":{
    "email":user.email,
    "password":user.password
    }
  }
    return this.http.post<any>(`${config.userURL}/users/login`,object,httpOptions).toPromise()
  }

  getUser(){
    var httpOptions1 = {
      headers:new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.accessToken.token})
    }
    console.log(this.accessToken.token)
    return this.http.get<any>(`${config.userURL}/user`,httpOptions1).toPromise();
  }

  updateProfile(user:any):Promise<any>{
    let user1={
           username:user.name,
           email:user.email,
           password:user.password
    }
    return this.http.put<any>(`${this.userURL}/2`,user1).toPromise();
  }



//    getAllUser(): Observable<any> {
//     return  this.http.get<any>(this.userURL).pipe(
//       tap(receivedAcount => {
//  this.acounts=receivedAcount;
//       }),
//       catchError(error => of([]))
//     );
//   }

async getAllUser(user) {
  let check:boolean=false;
 this.acounts=await this.http.get<any>(this.userURL).toPromise()
 console.log(this.acounts)
 this.acounts.forEach(item =>{
  if(user.email==item.email && user.password==item.password){
    check=true;
  }else{
    check=false
  }
})
return check;
}



ngOnint(){
  // this.getAllUser()
}
  loGin(user:User){
     this.data={...this.data,...user};
     console.log(this.data)
    return this.getAllUser(this.data); 
  }

 

}
