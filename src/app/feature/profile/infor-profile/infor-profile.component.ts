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
  public isactive: boolean = false;
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
    console.log(this.artcleService.goBackYourArticle)
    this.artcleService.home_profile = true;
    this.currentUser = JSON.parse(this.accessToken.getLocalStorage('currentUser'));
    // this.router.navigate(['profile', this.currentUser.username])    
    // this.router.navigate(['profile', this.currentUser.username])

    console.log(this.currentUser)
    this.artcleService.gobackHome = false;
    this.subscription = this.activateRoute.params.subscribe(async param => {
      this.currentUser = JSON.parse(this.accessToken.getLocalStorage('currentUser'));

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

  // async get_profile() {
  //   let data = await this.service.getProfile(this.currentUser.username)
  //   console.log('user:' + JSON.stringify(data))
  //   this.accessToken.inforMember = { ...data.profile };
  // }

  getupdateUser(username) {
    this.currentUser.username = username;
    this.isactive = this.artcleService.goBackYourArticle;
    console.log(this.artcleService.goBackYourArticle)
    this.artcleService.home_profile = true;
    console.log(this.currentUser)
    this.artcleService.gobackHome = false;
    this.subscription = this.activateRoute.params.subscribe(async param => {
      try {
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
      }
      catch (err) {
        console.log('get data failed', err)
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
      // console.log('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
    }
    return isValidFile;
  }

  public private_article(articles) {
    this.articles_private = articles.filter((data, index) => {
      if (this.validateFile(data.author.image)) {
        console.log('image format correctly')
      } else {
        // data.author.image = 'https://hinhanhdephd.com/wp-content/uploads/2016/03/hinh-anh-meo-con-de-thuong-nhat-1.jpg'
      }
      this.accessToken.likeHeart[index] = data.favoritesCount;
      return this.currentUser.username == data.author.username;
    })
  }

 async getlikeheart(value){
    try {
      let res = await this.artcleService.getArticle(null, null)
      this.articles = res.articles;
      this.private_article(this.articles)
    }
    catch (err) {
      console.log('get data failed', err)
    }
   }

  async onchange(event) {
    event.preventDefault();
    this.isactive = true;
    if (this.isactive) {
      this.artcleService.goBackYourArticle = true;
      this.artcleService.editArticle = true;
      console.log(this.artcleService.editArticle)
      try {
        let tag = this.properties[1];
        let keys = []
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
    }
  }

  async onchange1(event, tag?: string, value?: string) {
    event.preventDefault();
    this.isactive = false;
    if (!this.isactive) {
      this.artcleService.editArticle = false;
      this.artcleService.goBackYourArticle = false;
      try {
        let keys = []
        console.log(keys)
        console.log(tag)
        let res = await this.artcleService.getArticle(tag, value)
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
        if (this.currentUser.username) {
          this.private_article(this.articles)
        }
      }
      catch (err) {
        console.log("get data failed", err)
      }
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

  // viewProfile(username) {
  //   this.isactive = true;
  //   this.router.navigate([`profile/${username}`])
  // }

  editProfile(username) {
    this.router.navigate([`profile/${username}/edit`])
  }

  ngAfterViewInit() {

  }

}
