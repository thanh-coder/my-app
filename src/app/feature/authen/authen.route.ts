import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import{LoginGuard} from '../../share/service/guards/login.guard'
import{RegisterComponent} from './register/register.component'


export const authenRoutes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  {path:'signup',component:RegisterComponent},
  {path:'logout',redirectTo:'/login',pathMatch:'full'}
];
