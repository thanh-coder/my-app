import { Component, OnInit } from '@angular/core';
// import {User} from './../../../models/user.model'
import { User } from './user.model'
import { Service } from '../../../share/service/model/userService'
import { async } from 'q';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public error: number;
  public subscription: Subscription;

  constructor(public service: Service,
    private router: Router,
    public accessToken: AccessTokenService) { }

  ngOnInit() {
    this.user = new User();
    console.log('ban dau' + this.service.acounts)
    if (localStorage.getItem('currentUser')) {
      this.router.navigate([''])
    }
  }

  async  login(userform) {
    try {
      let res = await this.service.signIn(userform.value);
      localStorage.setItem('currentUser', JSON.stringify({ username: res.user.username, token: res.user.token, email: userform.value.email,password:userform.value.password}));
      this.accessToken.setToken(res.user.token);
      this.router.navigate([''])
      // window.location.reload();
    }
    catch (err) {
      console.log(err)
      this.error = -1;
      this.router.navigate(['login'])
    }
  }

  onSubmit(userform) {
    this.login(userform)
  }
}