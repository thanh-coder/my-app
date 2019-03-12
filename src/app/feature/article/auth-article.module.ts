import { NgModule } from '@angular/core';
import { Service } from '../../share/service/model/userService';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NewArticleComponent } from './new-article/new-article.component'
import { AccessGuard } from '../../share/service/guards/access.guard';
import { ApiService } from '../../share/service/lib/api.service';
import { LoginGuard } from '../../share/service/guards/login.guard'
import { RouterModule, Routes } from '@angular/router';
import { articleRoutes } from './article.route'

import { HomeLoginComponent } from './home-login/home-login.component';

import { ShareModule } from '../../share/share.module'
@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes),
    ShareModule,
  ],
  declarations: [ArticleDetailComponent,
    NewArticleComponent,
    ArticleDetailComponent,
    HomeLoginComponent],
  providers: [
    LoginGuard,
    AccessGuard
  ]

})
export class AuthArticleModule { }
