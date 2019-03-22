import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../share/service/model/userService'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit, OnChanges {
  @ViewChild('yourFeed') yourFeed: ElementRef;
  @ViewChild('yourGlobal') yourGlobal: ElementRef;

  public isactive: boolean = false;
  public isShow: string;
  public isHidden: boolean = false;
  public isslug: string;
  public articles: any;
  public articles_private: any;
  public private_user: boolean = false;
  public seperate_user: any;
  public properties: string[] = [];
  public currentUser: any;

  // public seperate_heart: any;
  public index: number;
  public slug: string;
  public countHeart: number[] = [];
  public body: string[] = [];
  constructor(public artcleService: Service1,
    public accessToken: AccessTokenService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public service: Service

  ) { }

  ngOnChanges() {

  }

  onchange(event) {
    event.preventDefault();
    this.isactive = !this.isactive;
    if (this.isactive) {
      this.artcleService.editArticle = true;
      this.artcleService.goBackYourArticle = this.isactive;
      console.log(this.artcleService.editArticle)
    } else {
      this.artcleService.goBackYourArticle = this.isactive;
      this.artcleService.editArticle = false;
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

  ngOnInit() {
    this.router.navigate(['home'])
    this.isactive = this.artcleService.goBackYourArticle;
    this.artcleService.home_profile = false;
    console.log(this.isactive)
    this.artcleService.editArticle = false;
    this.artcleService.gobackHome = true;
    this.activateRoute.queryParams.subscribe(async data => {
      try {
        let tag = this.properties[1];
        let keys = Object.keys(data)
        console.log(keys)
        console.log(tag)
        let res = await this.artcleService.getArticle(keys[0], tag)
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
        this.private_article(this.articles)
      }
      catch (err) {
        console.log('get data failed', err)
      }
    })
  }

  validateFile(value) {
    let allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
    let fileExtension = value.split('.').pop().toLowerCase();
    let isValidFile = false;
    for (var index in allowedExtension) {
      if (fileExtension === allowedExtension[index]) {
        isValidFile = true;
        break;
      }
    }
    if (!isValidFile || value == null) {
      console.log('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
    }
    return isValidFile;
  }

  public private_article(articles) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.articles_private = articles.filter((data, index) => {
        if (this.validateFile(data.author.image)) {
          console.log('image format correctly')
        } else {
          data.author.image = 'https://hinhanhdephd.com/wp-content/uploads/2016/03/hinh-anh-meo-con-de-thuong-nhat-1.jpg'
        }
        this.accessToken.likeHeart[index] = data.favoritesCount;
        console.log(this.accessToken.likeHeart[index])
        return this.currentUser.username == data.author.username;
      })
    } else {
      articles.forEach(data => {
        if (this.validateFile(data.author.image)) {
          console.log('image format correctly')
        } else {
          data.author.image = 'https://hinhanhdephd.com/wp-content/uploads/2016/03/hinh-anh-meo-con-de-thuong-nhat-1.jpg'
        }
      })
    }
  }

  async getlikeheart(value) {
    try {
      let res = await this.artcleService.getArticle(null, null)
      this.articles = res.articles;
      this.private_article(this.articles)
    }
    catch (err) {
      console.log('get data failed', err)
    }
  }

  getupdateUser(username) {
    this.currentUser.username = username;
    this.isactive = this.artcleService.goBackYourArticle;
    console.log(this.artcleService.goBackYourArticle)
    this.artcleService.home_profile = true;
    console.log(this.currentUser)
    this.artcleService.gobackHome = false;
    this.activateRoute.params.subscribe(async param => {
      if (param.id == JSON.parse(this.accessToken.getLocalStorage('currentUser')).username) {
        this.isactive = this.artcleService.goBackYourArticle;
        this.currentUser.username = param.id;
        this.accessToken.check_user = true;
        let res = await this.service.getProfile(JSON.parse(this.accessToken.getLocalStorage('currentUser')).username)
        console.log('user:' + JSON.stringify(res))
        this.accessToken.inforUser = { ...this.accessToken.inforUser, ...res.profile };
      } else {
        this.accessToken.check_user = false;
        this.currentUser.username = param.id;
        this.isactive = this.artcleService.goBackYourArticle;
        let data = await this.service.getProfile(this.currentUser.username)
        console.log('user:' + JSON.stringify(data))
        this.accessToken.inforMember = { ...data.profile };
      }
    })

    this.artcleService.editArticle = false;
    this.activateRoute.queryParams.subscribe(async data => {
      try {
        console.log(data)
        let tag = this.properties[1];
        let keys = Object.keys(data)
        console.log(keys)
        console.log(tag)
        let res = await this.artcleService.getArticle(keys[0], tag)
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
        if (this.currentUser.username) {
          this.private_article(this.articles)
        }
      }
      catch (err) {
        console.log("get data failed", err)
      }
    })
  }
  // public tha_tim(value, bd, i) {
  //   if (this.accessToken.token) {
  //     console.log(value)
  //     this.body[i] = value;
  //     console.log(this.body)
  //     this.articles.forEach((data, index) => {
  //       if (data.body == value && i == index) {
  //         this.artcleService.favorite_article(bd).then(data => {
  //           console.log(data.article.favoritesCount)
  //           this.accessToken.likeHeart[i] = data.article.favoritesCount;
  //         })
  //       }
  //     })
  //   } else {
  //     alert('ahjhj')
  //   }
  // }

  onSearch(tag, value) {
    let data = `${tag}:${value}`
    this.properties = data.split(':');
    let obj = {};
    obj[this.properties[0]] = this.properties[1];
    console.log(obj)
    this.router.navigate(['home'], { queryParams: obj })
  }

  viewProfile(username) {
    this.artcleService.goBackYourArticle = true;
    this.router.navigate([`profile/${username}`])
  }

}
