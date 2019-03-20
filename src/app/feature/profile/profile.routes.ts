import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { InforProfileComponent } from './infor-profile/infor-profile.component';
import { ProfileComponent } from './profile/profile.component';

export const profileRoutes: Routes = [
 {
     path:'profile/:id',
     component:ProfileComponent,
     children:[
         {
             path:'',
             component:InforProfileComponent
         },
         {
             path:'edit',
             component:UpdateProfileComponent
         }
     ]
 }
];
