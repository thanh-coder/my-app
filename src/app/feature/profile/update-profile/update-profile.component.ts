import { Component, OnInit } from '@angular/core';
import{Service} from '../../../share/service/model/userService'
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
public data:any;
  constructor(public service :Service, private router: Router) { }

  ngOnInit() {
    this.data = this.service.data;
  }

  onSubmit(profileForm:NgForm){
    this.service.updateProfile(profileForm.value).then(res=>{
      console.log(res)
      this.service.data={...this.service.data,...profileForm.value}
    })
    this.router.navigate(['profile']);
  }
}
