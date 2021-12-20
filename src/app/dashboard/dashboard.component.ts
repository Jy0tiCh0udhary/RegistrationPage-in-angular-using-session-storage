import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name!: string;
  address!: string;
  country!: string;
  city!: string;

  constructor() { }

  ngOnInit(): void {
    this.get();
  }

  people: any= [];
  user!:any;
  get(){
     //return sessionStorage.getItem('Users');

     console.log('user var==>',sessionStorage.getItem('Users'));
    // console.log(sessionStorage.getItem('Users'));
    //  sessionStorage.getItem('Users').name;
     this.user = sessionStorage.getItem('Users');
   // console.log('user==>'+this.user);
    let item =JSON.parse(this.user);
   // console.log('item name==>'+item.name);
   // console.log('item address==>'+item.address);
   // console.log('item name==>'+item[Object.keys(item)[0]]);
    this.user={
      name: item.name,
      address : item.address,
      country: item.country,
      capital : item.capital
    };
     }

}
