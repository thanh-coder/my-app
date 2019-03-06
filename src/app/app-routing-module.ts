import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { ProfileComponent } from './feature/profile/profile.component';
import{LoginGuard} from './share/service/guards/login.guard'
// import{UpdateProfileComponent} from  './components/update-profile/update-profile.component'


const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'profile',component:ProfileComponent,canActivate:[LoginGuard]},
  // {path:'update-profile',component:UpdateProfileComponent}
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