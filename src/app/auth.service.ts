import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient:HttpClient) { }
  authstatus:Boolean;
  authdata:any;
  public isAuthenticated():boolean{
    
    this.httpClient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
      
      this.authdata=data
     // console.log(data)
      
      return this.authdata.Authenticationstatus
      
    })
    
    
  }
}
