import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlecommentsComponent } from './articlecomments.component';

describe('ArticlecommentsComponent', () => {
  let component: ArticlecommentsComponent;
  let fixture: ComponentFixture<ArticlecommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlecommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlecommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
