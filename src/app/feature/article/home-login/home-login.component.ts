import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit, OnChanges {
  @ViewChild('yourFeed') yourFeed: ElementRef;
  @ViewChild('yourGlobal') yourGlobal: ElementRef;

  public isactive: boolean = false;
  public isShow: any;
  public isHidden: boolean = false;
  public isslug: string;
  public articles: any;
  public articles_private: any;
  public private_user: boolean = false;
  public seperate_user: any;

  public seperate_heart: any;
  public index: number;
  public slug: string;
  public countHeart: any = [];
  public body: any = [];
  constructor(public artcleService: Service1,
    public accessToken: AccessTokenService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnChanges() {

  }

  onchange(event) {
    event.preventDefault();
    this.isactive = !this.isactive;
    if (this.isactive) {
      this.artcleService.editArticle = true;
      console.log(this.artcleService.editArticle)
    } else {
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
    this.artcleService.editArticle = false;
    this.activateRoute.queryParams.subscribe(data => {
      console.log(data)
      let tag = data["tag"];
      let keys = Object.keys(data)
      console.log(keys)
      this.artcleService.getFeed(keys[0], tag).then(res => {
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
        let slug = localStorage.getItem(`slug-heart`)
        if (slug == null) {
          localStorage.setItem(`slug-heart`, JSON.stringify(this.body))
        } else {
          let split = slug.split('|')
          console.log(split)
          this.articles.forEach(async (item, index) => {
            if (split[index] == item.body) {
              console.log(item.body)
              let hearts = JSON.parse(localStorage.getItem(`heart-${item.body}`))
              console.log(hearts)
              this.countHeart[index] = hearts;
              console.log(this.countHeart[index])
            }
            console.log(this.countHeart[index])
          })
        }
      })
        .catch(err => console.log(err))
    })
  }

  public private_article(articles) {
    this.seperate_user = JSON.parse(localStorage.getItem('currentUser'));
    this.articles_private = articles.filter(data => {
      return this.seperate_user.username == data.author.username;
    })
  }

  public tha_tim(value, bd, i) {
    console.log(value)
    this.body[i] = value;
    console.log(this.body)
    localStorage.setItem(`slug-heart`, this.body.join('|'));
    console.log(localStorage.getItem(`slug-heart`))
    this.articles.forEach((data, index) => {
      if (data.body == value && i == index) {
        this.artcleService.favorite_article(bd).then(data => {
          console.log(data.article.favoritesCount)
          let hearts = {
            count: data.article.favoritesCount
          }
          localStorage.setItem(`heart-${value}`, JSON.stringify(hearts));
          this.countHeart[i] = JSON.parse(localStorage.getItem(`heart-${value}`));
          this.accessToken.likeHeart = this.countHeart[i].count;
        })
      }
    })
  }

  onSearch(tag, value) {
    let data = `${tag}:${value}`
    let properties = data.split(':');
    let obj = {};
    obj[properties[0]] = properties[1];
    console.log(obj)
    this.router.navigate(['home'], { queryParams: obj })
  }

}
