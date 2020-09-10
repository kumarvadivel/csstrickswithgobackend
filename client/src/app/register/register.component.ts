import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { FormControl,FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imagebase64:any=null;
  registerform=new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    password: new FormControl(''),
    reenter: new FormControl('')
  })
  logindata:any;
  toggler:boolean=false;
  data:any;
  message:any;
  converter($event){
    console.log(event)
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.handleInputChange(file);
  }
  handleInputChange(files){
    var file=files 
    var ff;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.warning('invalid format',"",{timeOut:800});
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e){
    let reader = e.target;
    var base64result = reader.result
    this.imagebase64=base64result
    //console.log(base64result)
  }
  register($event){
    //console.log(this.imagebase64)
    this.toggler=true
    event.preventDefault();
    this.data=this.registerform.value
    console.log(this.data)
    if(this.data.username==""){
      this.toastr.warning("username should not be empty","",{timeOut:800})
      return
    }
    else{
      if(this.data.firstname==""){
        this.toastr.warning("firstname should not be empty","",{timeOut:800})
          return
      }
      else{
        if(this.data.lastname==""){
          this.toastr.warning("lastname should not be empty","",{timeOut:800})
          return
        }
        else{
          if(this.data.email==""){
            this.toastr.warning("email should not be empty","",{timeOut:800})
          }
          else{

          if(this.data.phone==""){
            this.toastr.warning("phone number should not be empty","",{timeOut:800})
          }else{
            if(this.imagebase64==null){
              this.toastr.warning("please select a image","",{timeOut:800})
            }else{
          if(this.data.password==""){
            this.toastr.warning("password should not be empty","",{timeOut:800})
          }else{

          
          if(this.data.password.length<=6){
            this.toastr.info("password should be more than 6 characterers","",{timeOut:800})
            return
          }
          else{
            if(this.data.password==this.data.reenter){
              //this.message="signUp Succesfull"
              this.logindata={
                username:this.data.username,
                firstname:this.data.firstname,lastname:this.data.lastname,password:this.data.password,
                email:this.data.email,phone:this.data.phone,profileimage:this.imagebase64
              }
              this.spinner.show();
                    
                    
 
                    
                      /** spinner ends after 5 seconds */
                      
                      
                      
                    
              this.httpclient.post("http://localhost:3000/adduser",this.logindata,{withCredentials:false}).subscribe(data=>{
                
              if(data.error==""){
                  this.message=data.result
                  
                   
                  if(this.message=="Registration successful"){
                    this.toastr.success(this.message,"",{timeOut:1000})
                    this.router.navigate(['login'])
                    this.spinner.hide();
                    
                  }
                }else{
                  this.toastr.error(data.error,"",{timeOut:800})
                  return
                }
              })
              
            }
            else{
              this.toastr.error("passwords do not match","",{timeOut:800})
              return
            }
          }
        }
      }
    }
  }}}}
  }
  constructor(private httpclient:HttpClient,public router:Router,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

}
