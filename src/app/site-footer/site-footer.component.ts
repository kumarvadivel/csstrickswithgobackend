import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {
  mailinglist=new FormGroup({
    email:new FormControl('')
  })
  username:any;
  message:any;
  subscribe($event){
    event.preventDefault();
    
    this.httpclient.post("http://localhost:3000/maillist/subscribe",this.mailinglist.value).subscribe(data=>{
      
      this.toastr.success("Subscription Added successfully")
     
      this.mailinglist.setValue({
        email:""
      })
    })
  }
  constructor(private httpclient:HttpClient,public router:Router,private toastr: ToastrService) {
    this.httpclient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
        this.username=data.username
        this.httpclient.get("http://localhost:3000/getuserprofile/"+this.username).subscribe(data=>{
          this.mailinglist.setValue({
            email:data.email
          })
        })
    })
   }

  ngOnInit(): void {
  }

}
