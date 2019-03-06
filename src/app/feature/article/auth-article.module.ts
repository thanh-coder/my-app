import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import {Service} from '../../share/service/model/userService';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NewArticleComponent } from './new-article/new-article.component'
import{AccessGuard} from '../../share/service/guards/access.guard';
import { ApiService } from '../../share/service/lib/api.service';
import{LoginGuard} from '../../share/service/guards/login.guard'
import { RouterModule, Routes } from '@angular/router';
import {articleRoutes} from './article.route'
//  import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { HomeLoginComponent } from './home-login/home-login.component';
// import { HeaderComponent } from '../../share/layout/header/header.component';
// import { FooterComponent } from '../../share/layout/footer/footer.component';
// import { HeaderLoginComponent } from '../../share/layout/header-login/header-login.component';
import {ShareModule} from '../../share/share.module'
@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
   
    RouterModule.forChild(articleRoutes),
    ShareModule,
  ], 
  declarations: [ArticleDetailComponent,
     NewArticleComponent,
     ArticleDetailComponent,
    //  LoginComponent,
    //  RegisterComponent,
    //  HeaderComponent,
    //  FooterComponent,
    //  HeaderLoginComponent,
     HomeLoginComponent],
  providers:[
    LoginGuard,
    AccessGuard
]

 })
export class AuthArticleModule { }
