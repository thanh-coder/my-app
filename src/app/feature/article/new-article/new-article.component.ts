import { Component, OnInit,OnDestroy } from '@angular/core';
import {AccessTokenService} from '../../../share/service/tokenService/access-token.service'
import { ActivatedRoute, Router } from '@angular/router';
import{Service1} from '../../../share/service/model/articleService'
import {Subscription} from 'rxjs/Subscription'
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit,OnDestroy {
 
  public article:any={

  }
  public article1;

  constructor(public accessToken:AccessTokenService,
    public activateRoue:ActivatedRoute,
    public artcleService:Service1,
    public router:Router
    ) { }

    ngOnInit() {
      this.article1 = JSON.parse(localStorage.getItem('article'));

    }
    
    ngOnDestroy(){
          // if(this.subscription){
          //   this.subscription.unsubscribe();
          // }
          this.artcleService.edit_Add = false;
    }
    onSubmit(userForm){
      // console.log(JSON.stringify(userForm.value))
      this.artcleService.addArticle(userForm.value).then(res => {

      console.log("sau khi add data:" +JSON.stringify(res))
      this.router.navigate([''])      

    })
      .catch(err => console.log(err))
    }

}
