import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public arrNumber = [1,3,2,5,4];
  public sortvalue = 1;
  
  public events :any[] = [
    {name:'Angular Connect', date: '9/26/2036', time: '10am', location: {address: '1 London Rd', city: 'London', country: 'England'}},
    {name:'ng-nl', date: '4/15/2037', time: '9am', location: {address: '127 DT ', city: 'Amsterdam', country: 'NL'}},
    {name:'ng-conf 2037', date: '4/15/2037', time: '9am', location: {address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA'}},
    {name:'UN Angular Summit', date: '6/10/2037', time: '8am', location: {address: 'The UN Angular Center', city: 'New York', country: 'USA'}},
  ] 						

  public infor : any = {  
  name:'ngConf 2025',
  date: '3/1/2025',  
  time: '8am',
   location: {address: '123 Main St', city: 'Salt Lake City, UT', country: 'USA'}				
  }
public myText = "HELLO THERE. MAKE ME RENDER IN LOWER CASE";	
public myText1 = "this title should be in title case";		
  // constructor(){
  //   console.log(this.events)
  // }
  public count : number = 0;
  public stop : boolean =false;
  public ishidden : boolean =true;
  public thedate : Date = new Date(2035, 3, 1, 14, 15);		
  onhandlechange(value){
    this.sortvalue = value;
  }

  getCount(value){
   this.count = value;
  }
  onClick(){
    this.stop = !this.stop;
    console.log(this.stop);

  }
}
