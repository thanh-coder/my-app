import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { profileRoutes } from './profile.routes'
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module'

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    RouterModule.forChild(profileRoutes),
    ShareModule,

  ],
  declarations: []
})
export class ProfileModule { }
