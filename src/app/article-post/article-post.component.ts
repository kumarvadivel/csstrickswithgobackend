import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl,FormGroup} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-article-post',
  templateUrl: './article-post.component.html',
  styleUrls: ['./article-post.component.css']
})
export class ArticlePostComponent implements OnInit {
  navi:boolean=false;
  message:any;
  authdata:any;
   username:any;
   profileimage:any;
   postingdata:any;
  postform=new FormGroup({
    articlemeta:new FormControl(''),
    articletitle:new FormControl(''),
    postcontent:new FormControl('')
    
  })
  todaydate(){
    const date=new Date()
    let tostring=date.toString()
    tostring=tostring.substring(4,15)
    return tostring;
  }
  postdata($event){
    this.navi=true
    event.preventDefault();
    let formdata=this.postform.value;
    if(formdata.articlemeta===""){
        this.toastr.info("select a post type","",{timeOut:800})
        return
    }else{
      if(formdata.articletitle==""){
        this.toastr.info("Article should have a title","",{timeOut:800})
        return
      }else{
        if(formdata.articletitle.length>30){
          this.toastr.info("Article title should less than 30 letters","",{timeOut:800})
        }else{
          if(formdata.postcontent==""){
            this.toastr.info("Article should have a content","",{timeOut:800})
          }
          else{
            this.postingdata={
              articlemeta:formdata.articlemeta,
              articledate:this.todaydate(),
              articletitle:formdata.articletitle,
              authorname:this.username,
              authorimagelink:this.profileimage,
              postcontent:formdata.postcontent,
              username:this.username
            }
            //console.log(this.postingdata.articledate)
            this.httpClient.post("http://localhost:3000/addpost",this.postingdata,{withCredentials:false}).subscribe(data=>{
              this.spinner.show();
 
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.router.navigate(['/'])
                    this.spinner.hide();
                  }, 1000);
              this.toastr.success("Post added successfully","",{timeOut:800})
              
            })
            
          }
        }
      }
    }
    
  }
 
  constructor(private httpClient:HttpClient,public router:Router,private toastr: ToastrService,private spinner: NgxSpinnerService) { 
    
    this.httpClient.get("http://localhost:3000/authenticate",{withCredentials:true}).subscribe(data=>{
        
    if(data.Authenticationstatus){
      this.authdata=data
      this.username=this.authdata.username
      this.httpClient.get("http://localhost:3000/getuserprofile/"+this.username).subscribe(data=>{
        this.profileimage=data.profileimage
      })
    }
    else{
      
      
    }
  }) 
  
  }

  ngOnInit(): void {
   
  }

}
