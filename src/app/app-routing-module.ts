import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';
import{LoginGuard} from './share/service/guards/login.guard'


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }