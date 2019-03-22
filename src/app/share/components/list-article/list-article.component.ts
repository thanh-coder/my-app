import { Component, OnInit ,Input,Output,EventEmitter,NgZone,OnChanges } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit,OnChanges {
  @Input('articles_private') articles_private : any;
  @Input('username') username : any;
  @Output('updateUser') updateUser = new EventEmitter<any>();
  @Input('body') body: any;
  @Input('like') like: any;
  @Output('likeheart') likeheart: any = new EventEmitter<any>();

  constructor(
    public accessToken: AccessTokenService,
    private activateRoute: ActivatedRoute,
    public router: Router,
    public artcleService: Service1,
    private _ngZone: NgZone

  ) { }

  ngOnInit() {}

  ngOnChanges(){

  }

  viewProfile(username) {
    this.artcleService.goBackYourArticle = true;
    this.username = username;
		this.updateUser.emit(username);
    this.router.navigate([`profile/${username}`])
    this.artcleService.goBackYourArticle = true;
  }

  public  tha_tim(value, bd, i) {
    if (this.accessToken.token) {
      console.log(value)
      this.body[i] = value;
      console.log(this.body)
      this.articles_private.forEach(async (data, index) => {
        try{
        if (data.body == value && i == index) {
            let data = await this.artcleService.favorite_article(bd)
            console.log(data.article.favoritesCount)
            this.like[index] = data.article.favoritesCount;
            this.likeheart.emit(data.article.favoritesCount)
        }
      }
      catch(err){
        console.log('like article failed',err)
      }
      })
    } else {
      alert('ahjhj')
    }  
  }
}
