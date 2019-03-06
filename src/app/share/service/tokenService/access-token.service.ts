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
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
   }
   
   public logout(){
     if(localStorage.getItem('currentUser'))
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login'])

   }
   
   public checkUser(){
     if(localStorage.getItem('currentUser')){
       return true;
     }else{
       this.router.navigate(['login'])
       return false;
     }
   }


  

}
