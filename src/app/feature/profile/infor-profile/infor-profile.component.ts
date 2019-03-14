import { Service } from '../../../share/service/model/userService'
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { async } from 'q';

@Component({
  selector: 'app-infor-profile',
  templateUrl: './infor-profile.component.html',
  styleUrls: ['./infor-profile.component.css']
})
export class InforProfileComponent implements OnInit {
  public profile: object = {
  }
  public isactive: boolean = false;
  public isShow: any;
  public isHidden: boolean = false;
  public isslug: string;
  public articles: any;
  public articles_private: any;
  public private_user: boolean = false;
  public seperate_user: any;
  public countHeart: any =[];
  public body: any=[];
  constructor(public service: Service,
    public artcleService: Service1,
    public accessToken: AccessTokenService) {
  }

  ngOnInit() {
    if (this.service.data) {
      this.profile = {
        urlImage: this.service.data.image || "https://www.pexels.com/photo/sunglasses-sunset-summer-sand-46710/",
        name: this.service.data.username || "HungIT",
        describe: this.service.data.describe || "handsome,hoa dong",
        email: this.service.data.email || "anomoyos",
        password: this.service.data.password || "******",
      }
      this.artcleService.editArticle = false;


      this.artcleService.getArticle()
        .then(res => {
          console.log('bai viet:' + JSON.stringify(res))
          this.articles = res.articles;
          this.private_article(this.articles);
          let slug = localStorage.getItem(`slug-heart`)
        
          if (slug == null) {
            localStorage.setItem(`slug-heart`, JSON.stringify(this.body))
          } else {
            let split = slug.split('|')            // this.body = slug;
            console.log(split)

          this.articles.forEach( async (item,index) => {
            if (split[index] == item.body) {
              console.log(item.body)
              let hearts = JSON.parse(localStorage.getItem(`heart-${item.body}`))
              console.log(hearts)
              this.countHeart[index] = hearts;
              console.log(this.countHeart[index])
              // break;
            }
           console.log(this.countHeart[index])  
          })
          }
        })
        .catch(err => console.log(err))
    }
  }


  public private_article(articles) {
    this.seperate_user = JSON.parse(localStorage.getItem('currentUser'));
    this.articles_private = articles.filter(data => {
      return this.seperate_user.username == data.author.username;
    })
  }


  tha_tim(value,bd, i) {
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
        // this.slug = value;
        // console.log('index',this.index)
        // let hearts = {
        //   count: this.accessToken.countIncFollow()
        // }
        // console.log(hearts)
        // localStorage.setItem(`heart-${value}`, JSON.stringify(hearts));
        // this.countHeart = JSON.parse(localStorage.getItem(`heart-${value}`));
        // this.accessToken.likeHeart = this.countHeart.count;
      }
    })

    // localStorage.setItem('slug-heart',value);
    // this.articles.forEach((data,index) => {
    //   if(data.slug == value && i==index){
    //     this.slug = value;
    //     console.log('index',this.index)
    //     let hearts = {
    //       count: this.accessToken.countIncFollow()
    //     }
    //     console.log(hearts)
    //     localStorage.setItem(`heart-${value}`, JSON.stringify(hearts));
    //     this.countHeart = JSON.parse(localStorage.getItem(`heart-${value}`));
    //     this.accessToken.likeHeart = this.countHeart.count;
    //   }
    // })

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

  ngAfterViewInit() {
    // document.getElementById('yourFeed').addEventListener('click',(event) => {
    //   this.isactive = true;
    // })
    // document.getElementById('yourGlobal').addEventListener('click',(event) => {
    //   this.isactive = false;
    // })
  }






}
