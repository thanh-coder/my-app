import { Component, OnInit } from '@angular/core';
import { Service } from '../../../share/service/model/userService'
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service1 } from '../../../share/service/model/articleService'
import { AccessTokenService } from '../../../share/service/tokenService/access-token.service'
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public data: object;
  constructor(public service: Service,    public artcleService: Service1,
    public accessToken: AccessTokenService, private router: Router) { }

  ngOnInit() {
    this.data =this.accessToken.inforUser;
    console.log(this.data)
  }

  onSubmit(profileForm: NgForm) {
    this.service.updateProfile(profileForm.value).subscribe(res => {
      console.log(profileForm.value.image)
      this.accessToken.inforUser = { ...this.data, ...profileForm.value }
      localStorage.setItem('currentUser', JSON.stringify({ username: res.user.username, token: res.user.token,email: res.user.email,password:profileForm.value.password,image:res.user.image,bio:res.user.bio }))
      console.log(this.data);
    },
      err => {
        console.log(err);
      })
    this.router.navigate(['profile',JSON.parse(this.accessToken.getLocalStorage('currentUser')).username]);
  }
}
