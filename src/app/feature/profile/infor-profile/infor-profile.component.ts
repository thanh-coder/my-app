import { Service } from '../../../share/service/model/userService'
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Service1 } from '../../../share/service/model/articleService'
@Component({
  selector: 'app-infor-profile',
  templateUrl: './infor-profile.component.html',
  styleUrls: ['./infor-profile.component.css']
})
export class InforProfileComponent implements OnInit {
  public profile: object = {
  }
  public isactive: boolean = false;
  public isShow: boolean = true;
  public isHidden: boolean = false;
  public articles: any;
  constructor(public service: Service,
    public artcleService: Service1) {
  }

  ngOnInit() {
    if (this.service.data) {
      this.profile = {
        urlImage: this.service.data.image || "https://www.pexels.com/photo/sunglasses-sunset-summer-sand-46710/",
        name: this.service.data.username || "HungIT",
        describe: this.service.data.describe || "handsome,hoa dong",
        email: this.service.data.email || "anomoyos",
        password: this.service.data.password || "******",
      }
    }

    this.artcleService.getArticle()
      .then(res => {
        console.log('bai viet:' + JSON.stringify(res))
        this.articles = res.articles;
      })
      .catch(err => console.log(err))


  }


  ngOnChanges() {

    document.getElementById('yourFeed').addEventListener('click', (event) => {
      this.isactive = true;
      this.artcleService.editArticle = true;
      console.log(this.artcleService.editArticle)
    })
    document.getElementById('yourGlobal').addEventListener('click', (event) => {
      this.isactive = false;
      this.artcleService.editArticle = false;

    })
  }

  onchange(event) {
    this.isactive = !this.isactive;
    if (this.isactive) {
      this.artcleService.editArticle = true;
      console.log(this.artcleService.editArticle)
    }

  }
  showPost(event, i) {
    event.preventDefault();
    this.isShow = false;
    this.isHidden = true;

  }

  disable() {
    this.isShow = true;
    this.isHidden = false;
  }

  ngAfterViewInit() {
    // document.getElementById('yourFeed').addEventListener('click',(event) => {
    //   this.isactive = true;
    // })
    // document.getElementById('yourGlobal').addEventListener('click',(event) => {
    //   this.isactive = false;
    // })
  }




}
