import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl,FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { HttpBackend,HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  navi:boolean=false;
  loginform=new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
  logindata:any;
  
  iserror:boolean=false;

  login($event){
    this.navi=true
    
    const httppostoptions={   
      headers:
          new HttpHeaders (
          {   
              "Content-Type": "application/x-www-form-urlencoded"
          }),
      withCredentials: true,
  };
   
    event.preventDefault()
    if(this.loginform.value.username===""){
        this.toaster.info('username is empty',"",{timeOut: 1000})
    }else{
      if(this.loginform.value.password===""){
        this.toaster.info('password is empty',"",{timeOut: 1000})
      }
      else{

      
        
    this.httpClient.post('http://localhost:3000/login',this.loginform.value,httppostoptions).subscribe(data=>{
      this.logindata=data
      if(this.logindata.username===this.loginform.value.username){
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
        this.toaster.success(this.logindata.result,"login successfull",{
          timeOut: 1000
        })
        setTimeout(()=>{
          this.router.navigate([''])
        },800)
        
      }
      else{
        this.iserror=true;
        this.toaster.error(this.logindata.error,'Error',{
          timeOut: 1000
        })
        
      }
    })
  }}

 }
  constructor(private httpClient:HttpClient,public router:Router,private toaster:ToastrService,private spinner: NgxSpinnerService) {
    
  
  }

  ngOnInit(): void {
    
    
  }
  

}
