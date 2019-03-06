import { Component, OnInit } from '@angular/core';
import {AccessTokenService} from '../../../share/service/tokenService/access-token.service'
import{Service} from '../../../share/service/model/userService'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public accessToken:AccessTokenService,
    public service:Service
  ) { }

  ngOnInit() {
    console.log("toke:"+this.accessToken.token)
  }

  logout(){
    this.accessToken.logout();
  }

  viewUser(){
    this.service.getUser().then(res => {
      console.log('getUser:'+res.user.username);
    })
    .catch(err => console.log(err))
  }

}
