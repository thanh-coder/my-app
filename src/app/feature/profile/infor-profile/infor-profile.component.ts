import { Service } from '../../../share/service/model/userService'
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { async } from 'q';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'


@Component({
  selector: 'app-infor-profile',
  templateUrl: './infor-profile.component.html',
  styleUrls: ['./infor-profile.component.css']
})
export class InforProfileComponent implements OnInit {
  public profile: object = {
  }
  public isactive: boolean = true;
  public isShow: string;
  public isHidden: boolean = false;
  public isslug: string;
  public articles: any;
  public username: string;
  public articles_private: any;
  public article_user: any = [];
  public private_user: boolean = false;
  public seperate_user: any;
  public countHeart: any = [];
  public body: string[] = [];
  public properties: any = [];
  public currentUser: any;
  public subscription: Subscription;

  constructor(public service: Service,
    public artcleService: Service1,
    public accessToken: AccessTokenService,
    private activateRoute: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit() {
    this.isactive = this.artcleService.goBackYourArticle;
    this.artcleService.home_profile = true;
    this.currentUser = JSON.parse(this.accessToken.getLocalStorage('currentUser'));
    // this.router.navigate(['profile', this.currentUser.username])

    console.log(this.currentUser)
    this.artcleService.gobackHome = false;
    this.subscription = this.activateRoute.params.subscribe(param => {
      if (param.id == JSON.parse(this.accessToken.getLocalStorage('currentUser')).username) {
        this.currentUser.username = param.id;
        this.accessToken.check_user = true;
        this.service.getProfile(JSON.parse(this.accessToken.getLocalStorage('currentUser')).username).then(res => {
          console.log('user:' + JSON.stringify(res))
          this.accessToken.inforUser = { ...this.accessToken.inforUser, ...res.profile };
        })
      } else {
        this.accessToken.check_user = false;
        this.currentUser.username = param.id;
        this.service.getProfile(this.currentUser.username).then(res => {
          console.log('user:' + JSON.stringify(res))
          this.accessToken.inforMember = { ...res.profile };
        })
      }
    })

    this.artcleService.editArticle = false;
    this.activateRoute.queryParams.subscribe(data => {
      console.log(data)
      let tag = this.properties[1];
      let keys = Object.keys(data)
      console.log(keys)
      console.log(tag)
      this.artcleService.getArticle(keys[0], tag).then(res => {
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
        if (this.currentUser.username) {
          this.private_article(this.articles)
        }
      })
        .catch(err => console.log(err))
    })
  }


  public private_article(articles) {
    this.articles_private = articles.filter((data, index) => {
      this.accessToken.likeHeart[index] = data.favoritesCount;
      console.log(this.accessToken.likeHeart[index])
      return this.currentUser.username == data.author.username;
    })
  }

  public tha_tim(value, bd, i) {
    console.log(value)
    this.body[i] = value;
    console.log(this.body)
    this.articles.forEach((data, index) => {
      if (data.body == value && i == index) {
        this.artcleService.favorite_article(bd).then(data => {
          console.log(data.article.favoritesCount)
          this.accessToken.likeHeart[i] = data.article.favoritesCount;
        })
      }
    })
  }

  onchange(event) {
    event.preventDefault();
    this.isactive = true;
    if (this.isactive) {
      this.artcleService.goBackYourArticle = true;
      this.artcleService.editArticle = true;
      console.log(this.artcleService.editArticle)
      this.router.navigate(['profile', this.currentUser.username])
    }
  }

  onchange1(event, tag?: string, value?: string) {
    event.preventDefault();
    this.isactive = false;
    if (!this.isactive) {
      this.artcleService.editArticle = false;
      this.artcleService.goBackYourArticle = false;
      let data = `${tag}:${value}`
      this.properties = data.split(':');
      let obj = {};
      obj[this.properties[0]] = this.properties[1];
      console.log(obj)
      this.router.navigate(['profile', this.currentUser.username], { queryParams: obj })
    }
  }

  showPost(event, slug) {
    event.preventDefault();
    this.articles.forEach(item => {
      if (item.slug == slug) {
        this.isslug = item.slug;
        this.isShow = item.slug;
      }
    });
  }

  disable(slug) {
    this.articles.forEach(item => {
      if (item.slug == slug) {
        this.isslug = "";
        this.isShow = "";
      }
    });
  }

  viewProfile(username) {
    this.isactive = true;
    this.router.navigate([`profile/${username}`])
  }

  editProfile(username) {
    this.router.navigate([`profile/${username}/edit`])
  }

  ngAfterViewInit() {

  }

}
