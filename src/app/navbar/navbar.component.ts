import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navigator:string
  username:string =null;
  authstatus:any=null;
  pathcondition:string=null
  pathcondition2:string=null
  pathcondition3:string=null
  articles($event){
    event.preventDefault();
    this.navigator="articles"
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.router.navigate(["/Article"])
      this.spinner.hide();
    }, 800);
  }
  link($event){
    event.preventDefault();
    this.navigator="link"
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.router.navigate(["/Link"])
      this.spinner.hide();
    }, 800);
  }
  blog($event){
    event.preventDefault();
    this.navigator="blog"
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.router.navigate(["/Blog"])
      this.spinner.hide();
    }, 800);
  }
  addpost($event){
    event.preventDefault();
    
    if(this.pathcondition2==="/login"){
      this.toastr.warning("Login to continue","",{timeOut:800})
    }
    this.navigator=this.pathcondition2.substring(1,this.pathcondition2.length)
    this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.router.navigate([this.pathcondition2])
          this.spinner.hide();
        }, 800);
    //
    
  }
  bulkpost($event){
    event.preventDefault();
    
    if(this.pathcondition3==="/login"){
      this.toastr.warning("Login to continue","",{timeOut:800})
    }
    this.navigator=this.pathcondition3.substring(1,this.pathcondition3.length)
    this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.router.navigate([this.pathcondition3])
          this.spinner.hide();
        }, 800);
    //
    
  }
  dashboard($event){
    event.preventDefault();
    
    if(this.pathcondition==="/login"){
      this.toastr.warning("Login to continue","",{timeOut:800})
    }
    this.navigator=this.pathcondition.substring(1,this.pathcondition.length)
    this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.router.navigate([this.pathcondition])
          this.spinner.hide();
        }, 800);
    
  }
  constructor(private httpClient:HttpClient,private toastr: ToastrService,public router:Router,private spinner: NgxSpinnerService) { 
    this.httpClient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
       this.authstatus=data.Authenticationstatus
     this.username=data.username
    
     if(this.authstatus){
      this.pathcondition="/dashboard"
      this.pathcondition2="/newpost"
      this.pathcondition3="/bulkpost"
    }
    else{

      this.pathcondition="/login"
      this.pathcondition2="/login"
      this.pathcondition3="/login"
      
    }
    })
    

    
    
  }

  ngOnInit(): void {
    
  }

}
