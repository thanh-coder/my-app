import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config/config-service'

//models
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'

@Injectable()
export class ApiService {
  public token: any;

  public POST(url: string, data?: object, option?: any): Observable<any> {
    return this.http.post<any>(`${config.userURL}/${url}`, data, option).pipe(
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
  public UPDATE(url: string, user: any, option: any): Observable<any> {
    return this.http.put(`${config.userURL}/${url}`, user, option).pipe(
      tap(updatedUser => console.log(`updated User = ${JSON.stringify(updatedUser)}`)),
      catchError(error => of(new User()))
    );
  }

  public GET(url: string, option: any): Observable<any> {
    return this.http.get<any>(`${config.userURL}/${url}`, option);
  }

  public DELETE(url: string, option: any): Observable<any> {
    return this.http.delete<any>(`${config.userURL}/${url}`, option);
  }

  constructor(private http: HttpClient, private router: Router) { }

}
