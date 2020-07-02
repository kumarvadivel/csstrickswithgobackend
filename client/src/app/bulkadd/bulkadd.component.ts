import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.css']
})
export class BulkaddComponent implements OnInit {
  navi:boolean=false;
  dataList : any[];
  length:number;
  authdata:any;
   username:any;
   profileimage:any;
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

  todaydate(){
    const date=new Date()
    let tostring=date.toString()
    tostring=tostring.substring(4,15)
    return tostring;
  }
  postdata($event){
    event.preventDefault();
    this.navi=true
    this.length=this.dataList.length
        this.spinner.show()
    if("articletitle" in this.dataList[0] && "articlemeta" in this.dataList[0] && "postcontent" in this.dataList[0] ){
      
      var data=this.dataList.map(v=>({...v,articledate:this.todaydate(),authorname:this.username,authorimagelink:this.profileimage,username:this.username}))
      this.httpClient.post("http://localhost:3000/addbulkpost",data,{withCredentials:false}).subscribe(data=>{
        //this.spinner.hide()
        setTimeout(()=>{
          this.toastr.success(JSON.stringify(data),"")
          this.router.navigate([''])
        this.spinner.hide()
        },800)
        
      })
    }
    else{
      setTimeout(()=>{
        this.spinner.hide()
      this.toastr.error("Please format the data as instructed","Csv Data unclear")
      },800)
      
    }
   // var data=this.dataList.map(v=>({...v,articledate:this.todaydate(),authorname:this.username,authorimagelink:this.profileimage}))
    //console.log(data)
  }
  onChange(files: File[]){
    
    if(files[0]){
      //console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result,file) => {
          //console.log(result);
          this.dataList = result.data;
          //console.log(this.dataList);
        }
      });
    }
  }
  ngOnInit(): void {
  }

}
