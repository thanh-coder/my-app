import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {UserService} from './service/userService';

import {Service} from './service/model/userService';
import{AccessGuard} from './service/guards/access.guard';
import{LoginGuard} from './service/guards/login.guard'
import { RouterModule, Routes } from '@angular/router';
 import { FooterComponent} from './layout/footer/footer.component';
 import { HeaderComponent} from './layout/header/header.component';
 import { HeaderLoginComponent} from './layout/header-login/header-login.component';
// import { AccessDirective } from './directive/access.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ], 
  declarations: [
    //  HeaderComponent,
    //  FooterComponent,
    //  HeaderLoginComponent,
    // AccessDirective
  ],
  providers:[
LoginGuard,AccessGuard
],
exports:[
    // HeaderComponent,
    // FooterComponent,
    // HeaderLoginComponent,
    FormsModule,
    CommonModule

]

 })
export class ShareModule { }
