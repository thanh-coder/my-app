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
  public comment1: any = "";
  public pos: any;
  public i: number = 0;
  public display: any = false;
  public comments: any = [];
  public users: any = [];
  public follows: any;
  public favorites: any;
  public countFollow: number;
  public hiddenFollow: boolean = false;
  public hiddenunFollow: boolean = false;
  public hiddenFavorite: boolean = false;
  public hiddenunFavorite: boolean = false;

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
    this.artcleService.Follow_user(value).then(res => {
      console.log(this.accessToken.followUser)
      this.hiddenFollow = true;
      this.hiddenunFollow = false;
      localStorage.setItem(`disable-follow-${this.article.slug}`, JSON.stringify({ hiddenFollow: true, hiddenunFollow: false }));
      let follows = {
        follow: res.profile.following,
        count: this.accessToken.countIncFollow()
      }
      console.log(follows)
      localStorage.setItem(`follow-${this.article.slug}`, JSON.stringify(follows));
      this.follows = JSON.parse(localStorage.getItem(`follow-${this.article.slug}`));
      this.accessToken.followUser = this.follows.count;
    }).catch(err => console.log(err))
  }


  unfollowUser(value) {
    this.artcleService.unFollow_user(value).then(res => {
      this.hiddenFollow = false;
      this.hiddenunFollow = true;
      localStorage.setItem(`disable-follow-${this.article.slug}`, JSON.stringify({ hiddenFollow: false, hiddenunFollow: true }));
      let follows = {
        follow: res.profile.following,
        count: this.accessToken.countDesFollow()
      }
      localStorage.setItem(`follow-${this.article.slug}`, JSON.stringify(follows));
      this.follows = JSON.parse(localStorage.getItem(`follow-${this.article.slug}`));
      this.accessToken.followUser = this.follows.count;
      console.log(this.accessToken.followUser)
    }).catch(err => console.log(err))
  }

  favoriteArticle(value) {
    this.artcleService.favorite_article(value).then(res => {
      this.hiddenFavorite = true;
      this.hiddenunFavorite = false;
      localStorage.setItem(`disable-favorite-${this.article.slug}`, JSON.stringify({ hiddenFavorite: true, hiddenunFavorite: false }));
      let favorites = {
        favorite: res.article.favorited,
        count: this.accessToken.countFavorite()
      }
      localStorage.setItem(`favorite-${this.article.slug}`, JSON.stringify(favorites));
      this.favorites = JSON.parse(localStorage.getItem(`favorite-${this.article.slug}`));
      this.accessToken.favoriteArticle = this.favorites.count;
    }).catch(err => console.log(err))
  }

  unFavoriteArticle(value) {
    this.artcleService.unFavorite_article(value).then(res => {
      this.hiddenFavorite = false;
      this.hiddenunFavorite = true;
      localStorage.setItem(`disable-favorite-${this.article.slug}`, JSON.stringify({ hiddenFavorite: false, hiddenunFavorite: true }));
      let favorites = {
        favorite: res.article.favorited,
        count: this.accessToken.countdesFavorite()
      }
      localStorage.setItem(`favorite-${this.article.slug}`, JSON.stringify(favorites));
      this.favorites = JSON.parse(localStorage.getItem(`favorite-${this.article.slug}`));
      this.accessToken.favoriteArticle = this.favorites.count;
    }).catch(err => console.log(err))
  }

  handleParamsRoute() {
    this.subscription = this.activateRoue.params.subscribe(param => {
      console.log(param)
      let slug = param.id;
      this.artcleService.getArticleFromSlug(slug).then(data => {
        console.log(data)
        this.article = data.article;
        localStorage.setItem(`store-user`, JSON.stringify(this.article));
        if (this.article != null)
          this.comments = JSON.parse(localStorage.getItem(`comments-${this.article.slug}`))
        this.favorites = JSON.parse(localStorage.getItem(`favorite-${this.article.slug}`));
        this.follows = JSON.parse(localStorage.getItem(`follow-${this.article.slug}`));
        this.accessToken.followUser = this.follows.count;
        this.accessToken.favoriteArticle = this.favorites.count;
        let values_follow = JSON.parse(localStorage.getItem(`disable-follow-${this.article.slug}`))
        if(values_follow == null){
          localStorage.setItem(`disable-follow-${this.article.slug}`, JSON.stringify({ hiddenFollow: false, hiddenunFollow: false }));
        }else{
          this.hiddenFollow = values_follow.hiddenFollow;
          this.hiddenunFollow = values_follow.hiddenunFollow;
        }

        let values_favorite = JSON.parse(localStorage.getItem(`disable-favorite-${this.article.slug}`))
        if(values_favorite == null){
          localStorage.setItem(`disable-favorite-${this.article.slug}`, JSON.stringify({ hiddenFavorite: false, hiddenunFavorite: false }));
        }else{
          this.hiddenFavorite = values_favorite.hiddenFavorite;
          this.hiddenunFavorite = values_favorite.hiddenunFavorite;
          console.log(JSON.parse(localStorage.getItem(`disable-favorite-${this.article.slug}`)));
        }

        console.log('data la:' + this.article)
      })
    })
  }

  onEdit(article) {
    this.artcleService.edit_Add = true;
    localStorage.setItem("article", JSON.stringify(article));
    this.router.navigate(['new-article']);

  }

  onDeleteArticle(article) {
    console.log(JSON.stringify(article));
    this.artcleService.delete_Article(article.slug).then(res => {
      console.log('da xoa article');
      this.article = null;
    })
  }

  addComment(value) {
    this.artcleService.addComment(value, this.article.slug).then(res => {
      alert(JSON.stringify(res));
      this.comments = this.comments || [];
      this.comments.push(res.comment);
      // this.comments[this.i]=res.comment;
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
