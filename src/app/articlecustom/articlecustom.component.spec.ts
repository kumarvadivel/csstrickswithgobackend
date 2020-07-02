import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlecustomComponent } from './articlecustom.component';

describe('ArticlecustomComponent', () => {
  let component: ArticlecustomComponent;
  let fixture: ComponentFixture<ArticlecustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlecustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlecustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
