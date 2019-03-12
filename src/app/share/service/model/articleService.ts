import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config/config-service'
import { AccessTokenService } from '../tokenService/access-token.service'

import { ApiService } from '../lib/api.service'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class Service1 {
  public editArticle: boolean = false;
  public edit_Add: boolean = false;
  public acounts: any;
  public user: User = new User();

  constructor(
    public apiService: ApiService,
    public accessToken: AccessTokenService

  ) { }

  getArticle(): Promise<any> {
    return this.apiService.GET(`articles`, httpOptions).toPromise();
  }

  //    getAllUser(): Observable<any> {
  //     return  this.http.get<any>(this.userURL).pipe(
  //       tap(receivedAcount => {
  //  this.acounts=receivedAcount;
  //       }),
  //       catchError(error => of([]))
  //     );
  //   }

  addArticle(article): Promise<any> {
    let body = {
      "article": {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": [article.tagList]
      }
    }
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.POST(`articles`, body, httpOptions1).toPromise();
  }

  addComment(comment, slug): Promise<any> {
    let body = {
      "comment": {
        "body": comment
      }
    }
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.POST(`articles/${slug}/comments`, body, httpOptions1).toPromise();
  }

  edit_Article(article, slug) {
    let body = {
      "article": {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": [article.tagList]
      }
    }
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.POST(`articles/${slug}`, body, httpOptions1).toPromise();
  }

  delete_Comment_Article(id, slug) {
    console.log({ id, slug })
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.DELETE(`articles/${slug}/comments/${id}`, httpOptions1).toPromise();
  }

  delete_Article(slug) {
    console.log({ slug })
    var httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken.token })
    }
    return this.apiService.DELETE(`${config.userURL}/articles/${slug}`, httpOptions1).toPromise();
  }


  getArticleFromSlug(slug: any): Promise<any> {
    return this.apiService.GET(`articles/${slug}`, httpOptions).toPromise();
  }

  // async getAllUser(user): Promise<any> {
  //   let check:boolean=false;
  //  this.acounts=await this.http.get<any>(this.userURL).toPromise()
  //  console.log(this.acounts)
  //  this.acounts.forEach(item =>{
  //   if(user.email==item.email && user.password==item.password){
  //     check=true;
  //   }else{
  //     check=false
  //   }
  // })
  // return check;
  // .then(res=>res)
  // .then(value=>{
  //   this.acounts=value;
  // })
  // .catch(err=>console.log(err));
  // }


  // loGin(user:User){
  //   let data=user;
  //  console.log(this.getAllUser());
  //  return this.getAllUser(data);

  // }
}
