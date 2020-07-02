import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  name:any;
  postdata:any;
  userdata:any
  constructor(private httpclient:HttpClient,public router:Router, private route: ActivatedRoute) { 
    this.name = this.route.snapshot.paramMap.get('username');
    this.httpclient.get("http://localhost:3000/getuserprofile/"+this.name).subscribe(data=>{
        this.userdata=data
    })
    this.httpclient.get("http://localhost:3000/getuserposts/"+this.name).subscribe(data=>{
        this.postdata=data
    })
  }

  ngOnInit(): void {
  }

}
