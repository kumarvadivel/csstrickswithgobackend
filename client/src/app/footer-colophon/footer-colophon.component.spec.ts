import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterColophonComponent } from './footer-colophon.component';

describe('FooterColophonComponent', () => {
  let component: FooterColophonComponent;
  let fixture: ComponentFixture<FooterColophonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterColophonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterColophonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
