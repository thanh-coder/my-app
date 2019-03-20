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
    this.article1 = this.artcleService.updateArticle;
    console.log(this.artcleService.updateArticle)
  }

  ngOnDestroy() {
    this.artcleService.edit_Add = false;
  }

  onSubmit(userForm) {
    if (this.artcleService.edit_Add) {
      this.artcleService.goBackYourArticle = true;
      this.artcleService.edit_Article(userForm.value, this.article1.slug).then(res => {
        console.log("sau khi edit data:" + JSON.stringify(res))
        // if (this.artcleService.gobackHome) {
        //   this.router.navigate([''])
        // } else {
        //   this.router.navigate(['profile'])
        // }
        this.router.navigate(['/detail-article',this.article1.slug])
      })
        .catch(err => console.log(err))
    } else {
      this.artcleService.goBackYourArticle = true;
      this.artcleService.addArticle(userForm.value).then(res => {
        console.log("sau khi add data:" + JSON.stringify(res))
        // this.router.navigate([''])
        this.router.navigate(['/detail-article/'+res.article.slug])
      })
        .catch(err => console.log(err))
    }
  }
}
