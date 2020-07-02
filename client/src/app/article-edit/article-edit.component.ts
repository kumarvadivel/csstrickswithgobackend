import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HEROES,addata } from './../data/article-rail';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  @Input() hero
  navigator:string;
  bannerdata:any;
  delete($event){
    event.preventDefault()
    this.navigator="Deleting this post"
    alert("Are you sure you want to delete this post");
    this.spinner.show();
    this.httpclient.delete("http://localhost:3000/getposts/"+this.hero._id+"/delete").subscribe(data=>{
      
    })
    
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      location.reload()
      this.spinner.hide();
    }, 2000);
   
  }

  edit($event){
    event.preventDefault()
    this.navigator="Switching to post edit"
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['posts/edit/'+this.hero._id])
      this.spinner.hide();
    }, 2000);
   
  }
  constructor(private httpclient:HttpClient,public router:Router,private spinner: NgxSpinnerService) {
    this.bannerdata=addata[0]
   }

  ngOnInit(): void {
  }

}
