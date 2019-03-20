import { Component, OnInit, OnDestroy, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { Subscription } from 'rxjs/Subscription'
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  @ViewChild("tpl") tpl: TemplateRef<any>;
  public article: any;
  public subscription: Subscription;
  public comment1: string = "";
  public pos: number;
  public i: number = 0;
  public display: boolean = false;
  public comments: any = [];
  public users: any = {};
  public follows: object;
  public favorites: object;
  public hiddenFollow: boolean = false;
  public hiddenFavorite: boolean = false;

  constructor(public accessToken: AccessTokenService,
    public activateRoue: ActivatedRoute,
    public router: Router,
    public artcleService: Service1
  ) { }

  ngOnInit() {
    this.handleParamsRoute();
    console.log(this.artcleService.editArticle)
    this.users = JSON.parse(localStorage.getItem(`currentUser`));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  followUser(value) {
    if (!this.hiddenFollow) {
      this.artcleService.Follow_user(value).then(res => {
        console.log(this.accessToken.followUser)
        let follows = {
          follow: res.profile.following,
          count: this.accessToken.countIncFollow()
        }
        console.log(follows)
        this.hiddenFollow = res.profile.following;
      }).catch(err => console.log(err))

    } else {
      this.artcleService.unFollow_user(value).then(res => {
        let follows = {
          follow: res.profile.following,
          count: this.accessToken.countDesFollow()
        }
        console.log(follows)
        this.hiddenFollow = res.profile.following;
      })
    }
  }

  favoriteArticle(value, user) {
    if (!this.hiddenFavorite) {
      this.artcleService.favorite_article(value).then(res => {
        let favorites = {
          favorite: res.article.favorited,
          count: res.article.favoritesCount
        }
        this.accessToken.favoriteArticle = res.article.favoritesCount
        this.hiddenFavorite = !this.hiddenFavorite;
      }).catch(err => console.log(err))
    } else {
      this.artcleService.unFavorite_article(value).then(res => {
        let favorites = {
          favorite: res.article.favorited,
          count: res.article.favoritesCount
        }
        this.accessToken.favoriteArticle = res.article.favoritesCount
        this.hiddenFavorite = !this.hiddenFavorite;
      }).catch(err => console.log(err))
    }

  }

  handleParamsRoute() {
    this.subscription = this.activateRoue.params.subscribe(param => {
      console.log(param)
      let slug = param.id;
      this.artcleService.getArticleFromSlug(slug).then(data => {
        console.log(data)
        this.article = data.article;
        this.hiddenFollow = data.article.author.following;
        this.hiddenFavorite = data.article.favorited;
        this.accessToken.favoriteArticle = data.article.favoritesCount;
        if (this.article != null)
          this.comments = JSON.parse(localStorage.getItem(`comments-${this.article.slug}`))
        console.log('data la:' + this.article)
      })
    })
  }

  onEdit(article) {
    this.artcleService.edit_Add = true;
    this.artcleService.updateArticle = article;
    this.router.navigate(['new-article']);
  }

  gohome(){
    if(this.artcleService.goBackYourArticle){
    this.artcleService.goBackYourArticle = true;
  }else{
    this.artcleService.goBackYourArticle = false;
  }
  if(this.artcleService.home_profile){
    this.router.navigate(['profile'])
  }else{
    this.router.navigate([''])

  }
}

  onDeleteArticle(article) {
    console.log(JSON.stringify(article));
    this.artcleService.goBackYourArticle = true;
    this.artcleService.delete_Article(article.slug).then(res => {
      console.log('da xoa article');
      this.article = null;
      if (this.artcleService.gobackHome) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['profile', this.users.username])
      }
    })
  }

  addComment(value) {
    this.artcleService.addComment(value, this.article.slug).then(res => {
      this.comments = this.comments || [];
      this.comments.push(res.comment);
      localStorage.setItem(`comments-${this.article.slug}`, JSON.stringify(this.comments));
      this.comment1 = "";
    })
  }

  find(id) {
    for (let i = 0; i <= this.comments.length; i++) {
      if (this.comments[i].id == id) {
        this.pos = i;
        return true;
      }
    }
    return false;
  }
  onHover(id) {
    if (this.find(id)) {
      setTimeout(() => {
        this.display = !this.display;
      }, 100)
    } else {
      this.display = false;
    }
  }

  onDelete(id) {
    this.artcleService.delete_Comment_Article(id, this.article.slug).then(res => {
      console.log(res)
      let comments1 = JSON.parse(localStorage.getItem(`comments-${this.article.slug}`))
      let value = comments1.filter(item => item.id != id)
      console.log('comments:' + JSON.stringify(value))
      localStorage.removeItem('comments')
      localStorage.setItem(`comments-${this.article.slug}`, JSON.stringify(value))
      this.comments = value;
    })
  }
}
