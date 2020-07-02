import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularArticleComponent } from './popular-article.component';

describe('PopularArticleComponent', () => {
  let component: PopularArticleComponent;
  let fixture: ComponentFixture<PopularArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
