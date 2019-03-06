import { Component, OnInit } from '@angular/core';
import{Service} from '../../../share/service/model/userService'

@Component({
  selector: 'app-infor-profile',
  templateUrl: './infor-profile.component.html',
  styleUrls: ['./infor-profile.component.css']
})
export class InforProfileComponent implements OnInit {

  public profile:object={

  }
  constructor(public service :Service) {

   }

  ngOnInit() {
    if(this.service.data){
      this.profile ={
        urlImage:"https://www.pexels.com/photo/sunglasses-sunset-summer-sand-46710/",
        name:"HungIT",
        describe:"handsome,hoa dong",
        email:this.service.data.email,
        password:this.service.data.password,
      }
    }
  }

}
