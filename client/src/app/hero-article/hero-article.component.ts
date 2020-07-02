import { Component} from '@angular/core';

@Component({
  selector: 'app-hero-article',
  templateUrl: './hero-article.component.html',
  styleUrls: ['./hero-article.component.css']
})
export class HeroArticleComponent {

  constructor() { }
    article={
      articlemeta:"Fresh Article",
      articledate:"June 8, 2020",
      articletitle:"The Trickery it Takes to Create eBook-Like Text Columns",
      authorname:"Chris Coyier",
      authorimagelink:"https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&d=retro&r=pg",
      postcontent:"There’s some interesting CSS trickery in Jason Pamental’s digital book experience  on mobile. Which brings up an interesting question right away… how do you set full-width columns that add columns horizontally, as-needed ?  Well that’s a good trick right there, and it’s a one-liner:"

}
 ad={
    ad_img:"https://res.cloudinary.com/css-tricks/image/fetch/w_600,q_auto,f_auto/https://cdn4.buysellads.net/uu/7/65221/1591028064-MC_CSSTricks_Logo_600x600.jpg",
    ad_subimg:"https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png",
    ad_content:"Reach inboxes when it matters most. Instantly deliver transactional emails to your customers."
    }
 

}
