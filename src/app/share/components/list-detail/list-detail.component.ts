import { Component, OnInit, Input } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { Subscription } from 'rxjs/Subscription'
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  @Input('article') article: any;
  @Input('users') users: any;
  @Input('favoriteArticle') favoriteArticle: any;
  @Input('hiddenFollow') hiddenFollow: any;
  @Input('hiddenFavorite') hiddenFavorite: any;

  constructor(public accessToken: AccessTokenService,
    public activateRoue: ActivatedRoute,
    public router: Router,
    public artcleService: Service1
  ) { }
  ngOnInit() {
  }

  async followUser(value) {
    try {
      let res = await this.artcleService.Follow_user(value)
      let follows = {
        follow: res.profile.following,
      }
      console.log(follows)
      this.hiddenFollow = !this.hiddenFollow;
    }
    catch (err) {
      console.log('follow user failed', err)
    }
  }


  async unfollowUser(value) {
    try {
      let res = await this.artcleService.unFollow_user(value)
      let follows = {
        follow: res.profile.following,
      }
      console.log(follows)
      this.hiddenFollow = !this.hiddenFollow;
    }
    catch (err) {
      console.log('unfollow user failed', err)

    }
  }


  async favoritearticle(value, user) {
    try {
      let res = await this.artcleService.favorite_article(value)
      let favorites = {
        favorite: res.article.favorited,
        count: res.article.favoritesCount
      }
      console.log(res.article.favorited)
      this.accessToken.favoriteArticle = res.article.favoritesCount
      this.hiddenFavorite = !this.hiddenFavorite;
    }
    catch (err) {
      console.log('favorite article failed', err)
    }
  }


  async unfavoriteArticle(value, user) {
    try {
      let res = await this.artcleService.unFavorite_article(value)
      let favorites = {
        favorite: res.article.favorited,
        count: res.article.favoritesCount
      }
      console.log(res.article.favorited)
      this.accessToken.favoriteArticle = res.article.favoritesCount
      this.hiddenFavorite = !this.hiddenFavorite;
    }
    catch (err) {
      console.log('unfavorite aerticle failed', err)
    }
  }

  onEdit(article) {
    this.artcleService.edit_Add = true;
    this.artcleService.updateArticle = article;
    this.router.navigate(['new-article']);
  }

  async  onDeleteArticle(article) {
    try {
      this.artcleService.goBackYourArticle = true;
      let res = await this.artcleService.delete_Article(article.slug)
      console.log('da xoa article');
      this.article = null;
      if (this.artcleService.gobackHome) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['profile', this.users.username])
      }
    }
    catch (err) {
      console.log('delete article failed', err)
    }
  }

}
