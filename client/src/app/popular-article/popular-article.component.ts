import { MINICARD } from './../data/mini-card';
import { Component } from '@angular/core';
@Component({
  selector: 'app-popular-article',
  templateUrl: './popular-article.component.html',
  styleUrls: ['./popular-article.component.css']
})
export class PopularArticleComponent{


    minidata=MINICARD
  constructor() { 
      //console.log(this.minidata)
  }

  

}
