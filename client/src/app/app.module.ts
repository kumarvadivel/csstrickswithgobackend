import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule,Routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SiteBodyComponent } from './site-body/site-body.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { HeroArticleComponent } from './hero-article/hero-article.component';
import { ArticleComponent } from './article/article.component';
import { AuthorAvatarComponent } from './author-avatar/author-avatar.component';
import { AuthorNameAreaComponent } from './author-name-area/author-name-area.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { PopularArticleComponent } from './popular-article/popular-article.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { ArticleRailComponent } from './article-rail/article-rail.component';
import { FooterJobsComponent } from './footer-jobs/footer-jobs.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { FooterColophonComponent } from './footer-colophon/footer-colophon.component';
import { FooterPartnerComponent } from './footer-partner/footer-partner.component';
import { FooterSubsiteComponent } from './footer-subsite/footer-subsite.component';
import { LoginComponent } from './login/login.component';
import { ArticlePostComponent } from './article-post/article-post.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'
import { from } from 'rxjs';
import { ArticlecompComponent } from './articlecomp/articlecomp.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { EditpostComponent } from './editpost/editpost.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlecustomComponent } from './articlecustom/articlecustom.component';
import { ArticlecommentsComponent } from './articlecomments/articlecomments.component';
import { LinkComponent } from './link/link.component';
import { BlogComponent } from './blog/blog.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
//import {} from "@angular/compiler";
import {QuillModule} from 'ngx-quill'
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BulkaddComponent } from './bulkadd/bulkadd.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SiteBodyComponent,
    MainBodyComponent,
    HeroArticleComponent,
    ArticleComponent,
    AuthorAvatarComponent,
    AuthorNameAreaComponent,
    AdBannerComponent,
    PopularArticleComponent,
    MiniCardComponent,
    ArticleRailComponent,
    FooterJobsComponent,
    SiteFooterComponent,
    FooterColophonComponent,
    FooterPartnerComponent,
    FooterSubsiteComponent,
    LoginComponent,Routingcomponents, ArticlePostComponent, RegisterComponent, DashboardComponent, ArticlecompComponent, ArticleEditComponent, EditpostComponent, ArticlecustomComponent, ArticlecommentsComponent, LinkComponent, BlogComponent, UserprofileComponent, BulkaddComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule,QuillModule.forRoot(), ToastrModule.forRoot() ,NgxSpinnerModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 