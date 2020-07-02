
import { Component, OnInit,Input } from '@angular/core';
import {Hero} from './../data/article-rail'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
}) 
export class ArticleComponent{
    @Input('hero') hero;
    
    
  constructor() {
     
   }

  
}
