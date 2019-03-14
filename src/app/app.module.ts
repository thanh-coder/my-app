import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './share/layout/header/header.component';
import { FooterComponent } from './share/layout/footer/footer.component';
// import { HeaderLoginComponent } from './share/layout/header-login/header-login.component';
// import { LoginComponent } from './feature/login/login.component';
import { FormsModule } from '@angular/forms';
// import { RegisterComponent } from './feature/register/register.component';
import { AppRoutingModule } from './app-routing-module';
// import { HomeLoginComponent } from './feature/home-login/home-login.component';
// import { ProfileComponent } from './feature/profile/profile.component';
// import { ArticleComponent } from './feature/article/article.component';
import{LoginGuard} from './share/service/guards/login.guard'
import{Service} from './share/service/model/userService'
import{Service1} from './share/service/model/articleService'
import { HttpClientModule } from '@angular/common/http';
import { UpdateProfileComponent } from './feature/profile/update-profile/update-profile.component';
import { InforProfileComponent } from './feature/profile/infor-profile/infor-profile.component';
import{AccessGuard} from './share/service/guards/access.guard';
// import{UserService} from './share/service/userService'

import { ApiService } from './share/service/lib/api.service';
// import { ModuleComponent } from './feature/profile/module/module.component'
import {AuthArticleModule} from './feature/article/auth-article.module'
import { RouterModule, Routes } from '@angular/router';
import {ShareModule} from './share/share.module'
import {AuthenModule } from './feature/authen/authen.module'
import {ProfileModule } from './feature/profile/profile.module';
import { AccessTokenService } from './share/service/tokenService/access-token.service'
import { AccessDirective } from './share/directive/access.directive'
const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'profile',component:ProfileComponent,canActivate:[LoginGuard]},
  // {path:'update-profile',component:UpdateProfileComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // HeaderLoginComponent,
    // LoginComponent,
    // RegisterComponent,
    // HomeLoginComponent,
    // ProfileComponent,
    // ArticleComponent,
    UpdateProfileComponent,
    InforProfileComponent,
    AccessDirective  
    // ModuleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ShareModule,
    AuthArticleModule,
    AuthenModule,
    ProfileModule,
    RouterModule.forRoot(routes),
    HttpClientModule

  ],
  providers: [Service, ApiService,LoginGuard, AccessTokenService,Service1],
  bootstrap: [AppComponent]
})
export class AppModule { }
