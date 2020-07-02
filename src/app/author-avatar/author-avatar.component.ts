import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-author-avatar',
  templateUrl: './author-avatar.component.html',
  styleUrls: ['./author-avatar.component.css']
})
export class AuthorAvatarComponent  {

    @Input() img:any;
  constructor() { }

  ngOnInit(): void {
  }

}
