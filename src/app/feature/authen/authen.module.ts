import { NgModule } from '@angular/core';
import {ShareModule} from '../../share/share.module'
import {authenRoutes} from './authen.route'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import{LoginGuard} from '../../share/service/guards/login.guard'
import{RegisterComponent} from './register/register.component'
@NgModule({
  imports: [  
    RouterModule.forChild(authenRoutes),
    ShareModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenModule { }
