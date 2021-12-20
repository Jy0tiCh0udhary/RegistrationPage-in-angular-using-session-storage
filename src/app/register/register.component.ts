import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators, FormBuilder,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;
  user: any= {};
  submitted = false;
  name!: string;
  address! : string;
  event!: string;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient
   )
     { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      address: ['', Validators.required],
     country: ['', Validators.required],
      capital: ['', Validators.required],
    
  });
     this.getCountries();

 
  }

  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
  }
  
    console.log(this.form.value);
    this.user = Object.assign(this.user, this.form.value);
    sessionStorage.setItem('Users',JSON.stringify(this.user));
  }

  country: any= [];
 allcapital: any=[];
 capital: any=[];

   getCountries() {
    this.http.get("https://countriesnow.space/api/v0.1/countries/capital")
       .pipe(map((res:any)=>{
       console.log('response==>',res.data);
       return res.data;
    }))
   .subscribe((response:any) => {
 
     for(let i=0;i< response.length ;i++){
        this.country.push({
          id: i,
          name: response[i].name
        });
       /* this.allcapital.push({
          id: response[i].name,
          name: response[i].capital
        });*/
     }
   
    }, error =>{
      console.log(error);

    })

   }

   onSelect(countryid:any) {
    this.capital=[];
 
    this.http.post<any>("https://countriesnow.space/api/v0.1/countries/cities", {
      "country": countryid
    })
       .pipe(map((res:any)=>{
       console.log('city==>',res.data);
       return res.data;
    }))
   .subscribe((response:any) => {
    // console.log("URL==>",response);
     for(let i=0;i< response.length ;i++){
       this.capital.push(response[i]);
      }
    }, error =>{
      console.log(error);

    })

 
  }

}
