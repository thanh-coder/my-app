import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import{LoginGuard} from '../../share/service/guards/login.guard'
import{HomeLoginComponent} from './home-login/home-login.component'
// import{RegisterComponent} from './register/register.component'
import{NewArticleComponent} from  './new-article/new-article.component'
import{ArticleDetailComponent } from  './article-detail/article-detail.component'


export const articleRoutes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // { path: 'login', component: LoginComponent },
  {path:'home',component:HomeLoginComponent,canActivate:[LoginGuard]},
  // {path:'signup',component:RegisterComponent},
  {path:'new-article',component:NewArticleComponent},
  {path:'detail-article',component:ArticleDetailComponent}
];
