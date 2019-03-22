import { NgModule } from '@angular/core';
import { profileRoutes } from './profile.routes'
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module'
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { InforProfileComponent } from './infor-profile/infor-profile.component';
import { ProfileComponent } from './profile/profile.component';
// import { ArticleDirective } from '../../share/directive/article.directive'

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes),
    ShareModule,
  ],
  declarations: [
    UpdateProfileComponent,
    InforProfileComponent,
    ProfileComponent,
    // ArticleDirective
    // ProfileDirective
  ]


})
export class ProfileModule { }
