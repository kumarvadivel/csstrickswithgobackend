import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { request } from 'http';
import { browser } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  navi:boolean=false;
  userdata:any;
  authdata:any;
  postdata:any;
  public logout($event) {
    this.navi=true
    this.httpClient.get("http://localhost:3000/logout",{withCredentials:true}).subscribe(data=>{
      this.spinner.show();
    })
    this.toaster.success("logout successfull","",{timeOut: 1000})
    setTimeout(()=>{
      this.router.navigate([''])
      this.spinner.hide();
    },800)
    
  } 
    //console.log("this was clicked")
  
  constructor(private httpClient:HttpClient,public router:Router,private toaster:ToastrService,private spinner: NgxSpinnerService) { 
    /**(
     * logout
$event     */
   
     
      this.httpClient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
        
        if(data.Authenticationstatus){
          this.authdata=data
         this.httpClient.get("http://localhost:3000/getuserprofile/"+this.authdata.username).subscribe(data=>{
            this.userdata=data
         })
         this.httpClient.get("http://localhost:3000/getuserposts/"+this.authdata.username).subscribe(data=>{
           this.postdata=data
           console.log(this.postdata)
         })
        }
        else{
          this.router.navigate(['login'])
        }
      })      
  
  
 
  }
}
