import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent {

  constructor() { }
  dat:string;
  @Input() addata:any;

 
}
