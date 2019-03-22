import { Component, OnInit, OnDestroy, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { Subscription } from 'rxjs/Subscription'
import { async } from 'q';
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
  public hiddenFollow: boolean;
  public hiddenFavorite: boolean;;

  constructor(public accessToken: AccessTokenService,
    public activateRoue: ActivatedRoute,
    public router: Router,
    public artcleService: Service1
  ) { }

  ngOnInit() {
    this.handleParamsRoute();
    console.log(this.artcleService.editArticle)
    this.users = JSON.parse(this.accessToken.getLocalStorage(`currentUser`));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async handleParamsRoute() {
    this.subscription = await this.activateRoue.params.subscribe(async param => {
      console.log(param)
      let slug = param.id;
      let data = await this.artcleService.getArticleFromSlug(slug)
      this.article = data.article;
      this.hiddenFollow = !data.article.author.following;
      this.hiddenFavorite = !data.article.favorited;
      console.log(this.hiddenFollow)

      this.accessToken.favoriteArticle = data.article.favoritesCount;
      console.log(this.accessToken.favoriteArticle)
      if (this.article != null)
        this.comments = JSON.parse(this.accessToken.getLocalStorage(`comments-${this.article.slug}`))
      console.log('data la:' + this.article)
    })
  }

  viewProfile(username) {
    this.artcleService.goBackYourArticle = true;
    this.router.navigate([`profile/${username}`])
  }

  gohome() {
    if (this.artcleService.goBackYourArticle) {
      this.artcleService.goBackYourArticle = true;
    } else {
      this.artcleService.goBackYourArticle = false;
    }
    if (this.artcleService.home_profile) {
      this.router.navigate([`profile/${this.article.author.username}`])
    } else {
      this.router.navigate([''])

    }
  }

  async addComment(value) {
    try {
      let res = await this.artcleService.addComment(value, this.article.slug)
      this.comments = this.comments || [];
      this.comments.push(res.comment);
      this.accessToken.setLocalStorage(`comments-${this.article.slug}`, JSON.stringify(this.comments));
      this.comment1 = "";
    }
    catch (err) {
      console.log('add comment failed', err);
    }
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

  async onDelete(id) {
    try {
      let res = await this.artcleService.delete_Comment_Article(id, this.article.slug)
      console.log(res)
      let comments1 = JSON.parse(this.accessToken.getLocalStorage(`comments-${this.article.slug}`))
      let value = comments1.filter(item => item.id != id)
      console.log('comments:' + JSON.stringify(value))
      localStorage.removeItem('comments')
      this.accessToken.setLocalStorage(`comments-${this.article.slug}`, JSON.stringify(value))
      this.comments = value;
    }
    catch (err) {
      console.log('delete comment failed', err)
    }
  }
}
