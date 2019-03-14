import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config/config-service'
import { AccessTokenService } from '../tokenService/access-token.service'

//models
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'
// var httpOptions1 = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
// }
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ApiService {
  public token: any;

  public POST(url: string, data?: any): Observable<any> {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.http.post<any>(`${config.userURL}/${url}`, data, httpOptions1).pipe(
      tap(receivedMovies => {
        console.log(`receivedMovies is = ${JSON.stringify(receivedMovies)}`)
      }),
      catchError(error => of(new Acount()))
    );
  }

  public POST1(url: string): Observable<any> {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.http.post<any>(`${config.userURL}/${url}`,httpOptions1).pipe(
      tap(receivedMovies => {
        console.log(`receivedMovies is = ${JSON.stringify(receivedMovies)}`)
      }),
      catchError(error => of(new Acount()))
    );
  }


  public async getAllUser(user, url): Promise<any> {
    return await this.http.get<any>(url).toPromise()
  }

  /** PUT: update the movie on the server */
  public UPDATE(url: string, user: any): Observable<any> {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.http.put(`${config.userURL}/${url}`, user,httpOptions1).pipe(
      tap(updatedUser => console.log(`updated User = ${JSON.stringify(updatedUser)}`)),
      catchError(error => of(new User()))
    );
  }

  public GET(url: string): Observable<any> {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.http.get<any>(`${config.userURL}/${url}`,httpOptions1);
  }

  public DELETE(url: string): Observable<any> {
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.http.delete<any>(`${config.userURL}/${url}`,httpOptions1);
  }

    constructor(private http: HttpClient, private router: Router,public accessToken:AccessTokenService) { }

}
