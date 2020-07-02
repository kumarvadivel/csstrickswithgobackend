import { Injectable } from '@angular/core';
import{AuthService} from './auth.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  status:any;
  constructor(public auth:AuthService,public router:Router) { }

  canActivate():boolean{
    this.status=this.auth.isAuthenticated()
    console.log(this.status)
    if(!this.status){
      this.router.navigate(['login'])

      return false
    }
      return true
    
    
  }
}
