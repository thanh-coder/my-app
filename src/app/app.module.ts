import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/layout/header/header.component';
import { FooterComponent } from './share/layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import{LoginGuard} from './share/service/guards/login.guard'
import{Service} from './share/service/model/userService'
import{Service1} from './share/service/model/articleService'
import { HttpClientModule } from '@angular/common/http';
import { UpdateProfileComponent } from './feature/profile/update-profile/update-profile.component';
import { InforProfileComponent } from './feature/profile/infor-profile/infor-profile.component';
import{AccessGuard} from './share/service/guards/access.guard';
import { ApiService } from './share/service/lib/api.service';
import {AuthArticleModule} from './feature/article/auth-article.module'
import { RouterModule, Routes } from '@angular/router';
import {ShareModule} from './share/share.module'
import {AuthenModule } from './feature/authen/authen.module'
import {ProfileModule } from './feature/profile/profile.module';
import { AccessTokenService } from './share/service/tokenService/access-token.service'
import { AccessDirective } from './share/directive/access.directive'
// import { ProfileDirective } from './share/directive/profile.directive'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccessDirective,
    // ProfileDirective  
    // ModuleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ShareModule,
    AuthArticleModule,
    AuthenModule,
    ProfileModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [Service, ApiService,LoginGuard, AccessTokenService,Service1],
  bootstrap: [AppComponent]
})
export class AppModule { }
