import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  id:any;
  data:any;
  editform=new FormGroup({
    
  
  articletitle:new FormControl(''),
  
  postcontent:new FormControl('')
  })
  postdata($event){
    event.preventDefault();
    this.spinner.show();
    this.httpclient.put("http://localhost:3000/getposts/"+this.id+"/update",this.editform.value).subscribe(data=>{
      
      
    })
    
    
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.toastr.success("Changes saved successfully","",{timeOut:800})
    this.router.navigate(['/dashboard'])
      this.spinner.hide();
    }, 2500);
    
  }
  constructor(public router:Router, private route: ActivatedRoute,private httpclient:HttpClient,private toastr: ToastrService,private spinner: NgxSpinnerService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.httpclient.get("http://localhost:3000/getposts/"+this.id).subscribe(data=>{
      this.data=data
      
      this.editform.setValue({
        
        articletitle:this.data.articletitle,
        postcontent:this.data.postcontent
      })
      //this.httpclient.put("http://localhost:3000/getpost/"+this.id+"/update",this.data).subscribe()
    })
    
  }

  ngOnInit(): void {
    

    
  }

}
