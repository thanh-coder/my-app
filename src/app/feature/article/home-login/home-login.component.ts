import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('yourFeed') yourFeed: ElementRef;
  @ViewChild('yourGlobal') yourGlobal: ElementRef;

  public isactive: boolean = false;
  public isShow: any;
  public isHidden: boolean = false;
  public isslug: string;
  public articles: any;
  constructor(public artcleService: Service1,
    public accessToken: AccessTokenService) { }

  ngOnChanges() {

    //     document.getElementById('yourFeed').addEventListener('click',(event) => {
    //       this.isactive = true;
    //       this.artcleService.editArticle = true;
    //       console.log(this.artcleService.editArticle)
    //     })
    //     document.getElementById('yourGlobal').addEventListener('click',(event) => {
    //       this.isactive = false;
    //       this.artcleService.editArticle = false;

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


  ngOnInit() {
    this.artcleService.editArticle = false;

    this.artcleService.getArticle()
      .then(res => {
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
      })
      .catch(err => console.log(err))

  }

}
