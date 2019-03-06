import { Component, OnInit } from '@angular/core';
// import {User} from './../../../models/user.model'
import {User} from './user.model'
import{Service} from '../../../share/service/model/userService'
import { async } from 'q';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;
 
  constructor(public service:Service, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    console.log('ban dau'+this.service.acounts)
    // this.logginService.getAllUser().subscribe((user)=>{
    //  console.log(user);
    // });

  
    }
    // async getuser(){
    //   await this.logginService.getAllUser().subscribe((user)=>{
    //     console.log(user);
    // console.log('luc sau'+this.logginService.acounts[0])

    //    });

    // this.user={
    //   email:'aa',
    //   password:'bb'
    // }
  

  // }
  onSubmit(userform){
    this.service.signIn(userform.value)
    .then(res=>{
      console.log(res)
      this.router.navigate([''])
    })
    .catch(err => {
      console.log(err)
      this.router.navigate(['login'])
    })                                
  }
}
