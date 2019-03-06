import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
// @NgModule({
//   imports: [
//      RouterModule
//  ]
// })
export class HeaderLoginComponent implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }

}
