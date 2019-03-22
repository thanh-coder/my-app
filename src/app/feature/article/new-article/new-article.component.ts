import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { Subscription } from 'rxjs/Subscription'
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  public article: object = {}
  public article1;

  constructor(public accessToken: AccessTokenService,
    public activateRoue: ActivatedRoute,
    public artcleService: Service1,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.artcleService.gobackHome)
    if (this.artcleService.edit_Add) {
      this.article1 = this.artcleService.updateArticle;
    } else {
      this.article1 = {};
    }
    console.log(this.artcleService.updateArticle)
  }

  ngOnDestroy() {
    this.artcleService.edit_Add = false;
  }

  async onSubmit(userForm) {
    try {
      if (this.artcleService.edit_Add) {
        this.artcleService.goBackYourArticle = true;
        let res = await this.artcleService.edit_Article(userForm.value, this.article1.slug)
        console.log("sau khi edit data:" + JSON.stringify(res))
        this.router.navigate(['/detail-article', this.article1.slug])
      } else {
        this.artcleService.goBackYourArticle = true;
        let res = await this.artcleService.addArticle(userForm.value)
        console.log("sau khi add data:" + JSON.stringify(res))
        this.router.navigate(['/detail-article/' + res.article.slug])
      }
    }
    catch (err) {
      console.log('save data failed', err)
    }
  }
}

