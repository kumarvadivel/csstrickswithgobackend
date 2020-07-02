import { Component, OnInit, Input } from '@angular/core';
import { HEROES,addata } from './../data/article-rail';
@Component({
  selector: 'app-articlecustom',
  templateUrl: './articlecustom.component.html',
  styleUrls: ['./articlecustom.component.css']
})
export class ArticlecustomComponent implements OnInit {
  @Input() hero
  bannerdata:any;
  constructor() {
    this.bannerdata=addata[0]
   }

  ngOnInit(): void {
  }

}
