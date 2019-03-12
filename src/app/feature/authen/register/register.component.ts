import { Component, OnInit, OnChanges } from '@angular/core';
import { Acount } from './acount.model'
import { NgForm } from '@angular/forms';
import { Service } from '../../../share/service/model/userService'
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public acount: Acount;
  constructor(public service: Service, private router: Router,
    private route: ActivatedRoute,
    public accessToken: AccessTokenService
  ) { }
  public error: number = 0;
  ngOnInit() {
    this.acount = {
      name: '',
      email: '',
      password: ''

    }
    this.checkLogin();
  }
  checkLogin() {
    //  if(localStorage.getItem('user')){
    //    this.router.navigate([''])
    //  }
  }

  onSubmit(userForm: NgForm) {
    this.service.signUp(userForm.value).subscribe((inforUser) => {
      console.log(inforUser);
      if (inforUser != null) {
        localStorage.setItem('currentUser', JSON.stringify({ username: inforUser.user.username, token: inforUser.user.token }))
        this.accessToken.token = inforUser.user.token;
        this.router.navigate(['home']);
        console.log('token current :' + this.accessToken.token)
      } else {
        this.error = -1;
        this.router.navigate(['login']);
      }
    })
  }

  ngOnChanges() {
    console.log(this.acount)

  }


}
