import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
import { Service } from '../../../share/service/model/userService'
import { Service1 } from '../../../share/service/model/articleService'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  public user: any;
  public islogin: any = false;
  public nologin: any;
  constructor(
    private ref: ChangeDetectorRef,
    public accessToken: AccessTokenService,
    public service: Service,
    public articleService: Service1,
  ) { }

  ngOnChanges() {

  }
  ngOnInit() {

    // console.log("toke:"+this.accessToken.token)
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // if(this.accessToken.token!=null){
    //   this.islogin = true;
    //   this.ref.detectChanges();
    // }

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

  onChange() {
    this.articleService.edit_Add = false;
  }

}
