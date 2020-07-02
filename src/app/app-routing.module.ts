import { RegisterComponent } from './register/register.component';
import { ArticlePostComponent } from './article-post/article-post.component';
import { SiteBodyComponent } from './site-body/site-body.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { AppComponent } from './app.component';
import {ArticlecompComponent} from './articlecomp/articlecomp.component'
import { EditpostComponent } from './editpost/editpost.component';
import { LinkComponent } from './link/link.component';
import { BlogComponent } from './blog/blog.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BulkaddComponent } from './bulkadd/bulkadd.component';

const routes: Routes = [
    {
        path:'login',component:LoginComponent,
        canActivateChild:[AuthGuardService]
    },
     {
        path:'register',component:RegisterComponent,
        
        canActivateChild:[AuthGuardService]
    },
    {
        path:'',component:SiteBodyComponent
    },
    {
        path:'newpost',component:ArticlePostComponent ,
        canActivateChild:[AuthGuardService]
    },
    {
        path:'bulkpost',component:BulkaddComponent ,
        canActivateChild:[AuthGuardService]
    }
    ,{
        path:'dashboard',component:DashboardComponent,
        canActivateChild:[AuthGuardService]}
        , {
            path:'Article',component:ArticlecompComponent,
            
        },
        {
            path:'Link',component:LinkComponent,
            
        },
        {
            path:'Blog',component:BlogComponent,
            
        },
        {
            path:'user/profile/:username',component:UserprofileComponent,
            canActivateChild:[AuthGuardService]
            
        },
          {
            path:'posts/edit/:id',component:EditpostComponent,
            canActivateChild:[AuthGuardService]
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Routingcomponents=[LoginComponent] 