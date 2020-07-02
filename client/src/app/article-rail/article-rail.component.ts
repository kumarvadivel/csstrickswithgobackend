import { HEROES,addata } from './../data/article-rail';
import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-article-rail',
  templateUrl: './article-rail.component.html',
  styleUrls: ['./article-rail.component.css']
})
export class ArticleRailComponent {

 heroes=HEROES
 addata=addata
 posts:any=null
  constructor(private httpClient:HttpClient) {
    this.httpClient.get("http://localhost:3000/getposts").subscribe(data=>{
      this.posts=data;
     // console.log(this.posts)
    })
      //console.log(this.heroes)
  }

 
}
