import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlecompComponent } from './articlecomp.component';

describe('ArticlecompComponent', () => {
  let component: ArticlecompComponent;
  let fixture: ComponentFixture<ArticlecompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlecompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
