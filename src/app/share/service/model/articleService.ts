import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Acount } from '../../models/acount.model'
import { User } from '../../models/user.model'
import { config } from '../config/config-service'
import { AccessTokenService } from '../tokenService/access-token.service'
import { ApiService } from '../lib/api.service'

@Injectable()
export class Service1 {
  public editArticle: boolean = false;
  public edit_Add: boolean = false;
  public acounts: object;
  public user: User = new User();
  public favoriteArticle: number;
  public gobackHome: boolean = true;
  public updateArticle: object;
  public goBackYourArticle:boolean = true;
  public home_profile:boolean =false;

  constructor(
    public apiService: ApiService,
    public accessToken: AccessTokenService

  ) { }

  getArticle(key?: any, tag?: string): Promise<any> {
    return this.apiService.GET(`articles/?${key}=${tag}`).toPromise();
  }

  addArticle(article): Promise<any> {
    let body = {
      "article": {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": [article.tagList]
      }
    }
    return this.apiService.POST(`articles`, body).toPromise();
  }

  addComment(comment, slug): Promise<any> {
    let body = {
      "comment": {
        "body": comment
      }
    }
    return this.apiService.POST(`articles/${slug}/comments`, body).toPromise();
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
    return this.apiService.UPDATE(`articles/${slug}`, body).toPromise();
  }

  delete_Comment_Article(id, slug) {
    return this.apiService.DELETE(`articles/${slug}/comments/${id}`).toPromise();
  }

  delete_Article(slug) {
    return this.apiService.DELETE(`articles/${slug}`).toPromise();
  }

  Follow_user(param) {
    let body = {
      "article": {
        "title": "",
        "description": " article.description",
        "body": "article.body",
        "tagList": ["article.tagList"]
      }
    }
    return this.apiService.POST(`profiles/${param}/follow`, body).toPromise();
  }


  unFollow_user(param) {
    return this.apiService.DELETE(`profiles/${param}/follow`).toPromise();
  }


  favorite_article(param) {
    let body = {
      "article": {
        "title": "",
        "description": " article.description",
        "body": "article.body",
        "tagList": ["article.tagList"]
      }
    }
    return this.apiService.POST(`articles/${param}/favorite`, body).toPromise();
  }


  unFavorite_article(param) {
    return this.apiService.DELETE(`articles/${param}/favorite`).toPromise();
  }


  getArticleFromSlug(slug: any): Promise<any> {
    return this.apiService.GET(`articles/${slug}`).toPromise();
  }


  //    getAllUser(): Observable<any> {
  //     return  this.http.get<any>(this.userURL).pipe(
  //       tap(receivedAcount => {
  //  this.acounts=receivedAcount;
  //       }),
  //       catchError(error => of([]))
  //     );
  //   }

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
