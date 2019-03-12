import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../share/service/guards/login.guard'
import { HomeLoginComponent } from './home-login/home-login.component'
import { NewArticleComponent } from './new-article/new-article.component'
import { ArticleDetailComponent } from './article-detail/article-detail.component'


export const articleRoutes: Routes = [
  { path: 'home', component: HomeLoginComponent },
  { path: 'new-article', component: NewArticleComponent },
  { path: 'detail-article/:id', component: ArticleDetailComponent }
];
