import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HEROES,addata } from './../data/article-rail';
@Component({
  selector: 'app-articlecomp',
  templateUrl: './articlecomp.component.html',
  styleUrls: ['./articlecomp.component.css']
})
export class ArticlecompComponent implements OnInit {
    data:any;
    bannerdata:any;
  constructor(private http:HttpClient,public router:Router) { 
    this.http.get("http://localhost:3000/getposts/filter/Article").subscribe(dt=>{
        this.data=dt
        console.log(this.data)
    });
    this.bannerdata=addata[0]
  }

  ngOnInit(): void {
  }

}
