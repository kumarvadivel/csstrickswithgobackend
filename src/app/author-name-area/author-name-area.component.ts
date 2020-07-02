import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-author-name-area',
  templateUrl: './author-name-area.component.html',
  styleUrls: ['./author-name-area.component.css']
})
export class AuthorNameAreaComponent  {
    navi:boolean=false
    navigator:string;
    @Input() name:any;
    pathcondition:string=null;
    navigate($event){
      event.preventDefault()
      this.navi=true
      if(this.pathcondition==="/dashboard"){
        this.navigator=this.pathcondition.substring(1,this.pathcondition.length)
      }else{
        this.navigator=this.name
      }
      this.spinner.show();
 
    setTimeout(() => {
      this.router.navigate([this.pathcondition])
      this.spinner.hide();
    }, 2000);
      
    }
  constructor(private httpclient:HttpClient,public router:Router,private spinner: NgxSpinnerService) {
    this.httpclient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
      if(data.username===this.name){
        this.pathcondition="/dashboard"
      }
      else{
        this.pathcondition="/user/profile/"+this.name
      }
    })
   }

  

}
