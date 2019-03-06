import { Injectable } from '@angular/core';
// import { fakeMovies } from './fake-movies';

//Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {Acount} from '../../models/acount.model'
import {User} from '../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {ApiService} from '../lib/api.service'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class Service {
public acounts:any;
public user:User=new User();
// public userURL = 'http://68.183.183.83/api/users';
public userURL = 'http://localhost:3000/user';

// getMovies(): Observable<Movie[]> {
//   // this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
//   // return of(fakeMovies);
//   return this.http.get<Movie[]>(this.moviesURL).pipe(
//     tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
//     catchError(error => of([]))
//   );
// }
// getMovieFromId(id: number): Observable<Movie> {
//   // return of(fakeMovies.find(movie => movie.id === id));
//   const url = `${this.moviesURL}/${id}`;
//   return this.http.get<Movie>(url).pipe(
//     tap(selectedMovie => console.log(`selected movie = ${JSON.stringify(selectedMovie)}`)),
//     catchError(error => of(new Movie()))
//   );
// }
// /** PUT: update the movie on the server */
// updateMovie(movie: Movie): Observable<any> {    
//   return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
//     tap(updatedMovie => console.log(`updated movie = ${JSON.stringify(updatedMovie)}`)),
//     catchError(error => of(new Movie()))
//   );
// }
// /** POST: add a new movie to the server */
// addMovie(newMovie: Movie): Observable<Movie> {        
//   return this.http.post<Movie>(this.moviesURL, newMovie, httpOptions).pipe(
//     tap((movie: Movie) => console.log(`inserted movie = ${JSON.stringify(movie)}`)),
//     catchError(error => of(new Movie()))
//   );
// }


signUp(acount: any): Observable<any> {
  console.log(acount);
  let object:any ={
    "user":{
      "username":acount.name,
    "email":acount.email,
      "password":acount.password
    }
  }
   return this.http.post<any>(this.userURL, object,httpOptions).pipe(
    tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
     catchError(error => of(new Acount()))
   );}

//    getAllUser(): Observable<any> {
//     return  this.http.get<any>(this.userURL).pipe(
//       tap(receivedAcount => {
//  this.acounts=receivedAcount;
//       }),
//       catchError(error => of([]))
//     );
//   }

async getAllUser(user): Promise<any> {
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
  // .then(res=>res)
  // .then(value=>{
  //   this.acounts=value;
  // })
  // .catch(err=>console.log(err));
}


  loGin(user:User){
    let data=user;
  //  console.log(this.getAllUser());
   return this.getAllUser(data);
   
  }
  constructor(private http: HttpClient, private router: Router,public apiService:ApiService
  ) { }
 

}
