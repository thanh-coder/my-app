import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { Service } from '../../../share/service/model/userService'
import { Service1 } from '../../../share/service/model/articleService'
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  public user: any;
  public islogin: boolean = false;
  public username:string;

  constructor(
    private ref: ChangeDetectorRef,
    public accessToken: AccessTokenService,
    public service: Service,
    public articleService: Service1,
    public router: Router,
    private activateRoute: ActivatedRoute,

  ) { }

  ngOnChanges() {

  }
  ngOnInit() {
    console.log(this.accessToken.followUser)
    console.log(this.accessToken.inforUser)
    this.username = JSON.parse(this.accessToken.getLocalStorage('currentUser')).username;
    this.service.getUser().then(res => {
      console.log('user:' + JSON.stringify(res))
      this.accessToken.inforUser = {...res.user,username:JSON.parse(this.accessToken.getLocalStorage('currentUser')).username};
    })
    this.router.navigate(['home'])
  }

  logout() {
    this.accessToken.logout();
    this.islogin = false;
    this.ref.detectChanges();
  }

  viewUser() {
    let user = JSON.parse(this.accessToken.getLocalStorage('currentUser'))
    this.service.getProfile(user.username).then(res => {
    console.log('getUser:' + res);
    })
    .catch(err => console.log(err))
  }

  viewProfile(username){
    this.router.navigate([`profile/${username}/edit`])
  }

  onChange() {
    this.articleService.edit_Add = false;
  }
}
