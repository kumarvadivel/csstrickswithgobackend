import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HEROES,addata } from './../data/article-rail';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  data:any;
  bannerdata:any;
  constructor(private http:HttpClient,public router:Router) { 
    this.http.get("http://localhost:3000/getposts/filter/Blog").subscribe(dt=>{
      this.data=dt
      console.log(this.data)
  });
  this.bannerdata=addata[0]
  }

  ngOnInit(): void {
  }

}
