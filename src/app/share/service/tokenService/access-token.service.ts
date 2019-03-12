import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AccessTokenService {
public token:any=null;
  constructor(private router: Router) {
    var currentUser = JSON.parse(this.getLocalStorage('currentUser'));
    // this.token = currentUser && currentUser.token;
    this.setToken(currentUser.token)
   }
  
   public setLocalStorage(item,value){
     localStorage.setItem(item,value);
   }
 
   public getLocalStorage(item){
     return localStorage.getItem(item);
   }
   public setToken(value){
     this.token = value;
   }

   public getToken(){
     return this.token;
   }
   
   public logout(){
     if(this.getLocalStorage('currentUser'))
    this.setToken(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['login'])

   }
   
   public checkUser(){
     if(this.getLocalStorage('currentUser')){
       return true;
     }else{
       this.router.navigate(['login'])
       return false;
     }
   }
}
