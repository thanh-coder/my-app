import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//models
import {Acount} from '../../models/acount.model'
import {User} from '../../models/user.model'

@Injectable()
export class ApiService {
 public token:any;
  
  public POST(url:string,data?:object,option?:any): Observable<any>{
    return this.http.post<any>(url, data,option).pipe(
      tap(receivedMovies => {
        console.log(`receivedMovies is = ${JSON.stringify(receivedMovies)}`)
        // this.token = receivedMovies.user.token
      }),
       catchError(error => of(new Acount()))
     );
  }

  public async getAllUser(user,url): Promise<any> {
   return await this.http.get<any>(url).toPromise()   
  }

  /** PUT: update the movie on the server */
public UPDATE(user:any,url:string,option:any): Observable<any> {    
  return this.http.put(`${url}/${user.email}`,user,option).pipe(
    tap(updatedMovie => console.log(`updated movie = ${JSON.stringify(updatedMovie)}`)),
    catchError(error => of(new User()))
  );
}

public DELETE(user:any,URL:string,option:any): Observable<any> {    
  const url = `${URL}/${user.email}`;
  return this.http.delete<any>(url, option).pipe(
    tap(_ => console.log(`Deleted movie with email = ${user.email}`)),
    catchError(error => of(null))
  );
}
  


  constructor(private http: HttpClient, private router: Router) { }

}
