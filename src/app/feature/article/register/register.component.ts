import { Component, OnInit,OnChanges } from '@angular/core';
import {Acount} from './acount.model'
import { NgForm } from '@angular/forms';
import{Service} from '../../../share/service/model/userService'
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public acount:Acount;
  constructor(public service:Service, private router: Router,private route: ActivatedRoute) { }
public error:number=0;
  ngOnInit() {
    this.acount={
      name:'',
      email:'',
      password:''

    }
  this.checkLogin();
  }
  checkLogin(){
  //  if(localStorage.getItem('user')){
  //    this.router.navigate([''])
  //  }
  }

  onSubmit(userForm:NgForm){
this.service.signUp(userForm.value).subscribe((inforUser) =>{
console.log("register"+inforUser.name);
console.log("register");
if(inforUser && inforUser.length >0){
  // localStorage.setItem('user',JSON.stringify(inforUser))
this.router.navigate(['home']);

}else{
  this.error=-1;
this.router.navigate(['login']);

}

})

  }
  ngOnChanges(){
  console.log(this.acount)

  }
  

}
