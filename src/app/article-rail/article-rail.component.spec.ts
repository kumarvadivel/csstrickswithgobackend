import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRailComponent } from './article-rail.component';

describe('ArticleRailComponent', () => {
  let component: ArticleRailComponent;
  let fixture: ComponentFixture<ArticleRailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleRailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
