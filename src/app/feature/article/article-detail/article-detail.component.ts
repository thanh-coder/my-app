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
  constructor(public accessToken: AccessTokenService,
    public activateRoue: ActivatedRoute,
    public router: Router,
    public artcleService: Service1
  ) { }

  ngOnInit() {
    this.handleParamsRoute();
    console.log(this.artcleService.editArticle)
    // if(this.article != null)
    // this.comments = JSON.parse(localStorage.getItem(`comments-${this.article.slug}`))
    // console.log('data la:'+this.article)

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  handleParamsRoute() {
    this.subscription = this.activateRoue.params.subscribe(param => {
      console.log(param)
      let slug = param.id;
      this.artcleService.getArticleFromSlug(slug).then(data => {
        console.log(data)
        this.article = data.article;
        if (this.article != null)
          this.comments = JSON.parse(localStorage.getItem(`comments-${this.article.slug}`))
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
