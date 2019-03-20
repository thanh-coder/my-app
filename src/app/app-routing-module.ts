import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';
// import { ProfileComponent } from './feature/profile/profile.component';
import{LoginGuard} from './share/service/guards/login.guard'
// import{UpdateProfileComponent} from  './components/update-profile/update-profile.component'
// import { HomeLoginComponent } from './feature/article/home-login/home-login.component'


const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'profile',component:ProfileComponent,canActivate:[LoginGuard]},
  // {path:'update-profile',component:UpdateProfileComponent}
  {path:'',redirectTo:'/home',pathMatch:'full'},
  // { path: 'profile', loadChildren: './feature/profile/profile.module#ProfileModule' }
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }