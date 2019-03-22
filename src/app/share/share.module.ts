import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from './service/model/userService';
import { AccessGuard } from './service/guards/access.guard';
import { LoginGuard } from './service/guards/login.guard'
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ListArticleComponent } from './components/list-article/list-article.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { ValidateDirective } from './directive/validate.directive';
import { ArticleDirective } from './directive/article.directive';
import { ProfileDirective } from './directive/profile.directive';
import { NoUserDirective } from './directive/no-user.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    ListArticleComponent,
    ListDetailComponent,
    ValidateDirective,
    ArticleDirective,
    ProfileDirective,
    NoUserDirective
  ],
  providers: [
    LoginGuard, AccessGuard
  ],
  exports: [
    FormsModule,
    CommonModule,
    ListArticleComponent,
    ListDetailComponent,
    ValidateDirective,
    ArticleDirective,
    ProfileDirective,
    NoUserDirective


  ]

})
export class ShareModule { }
