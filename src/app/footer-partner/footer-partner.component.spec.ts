import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPartnerComponent } from './footer-partner.component';

describe('FooterPartnerComponent', () => {
  let component: FooterPartnerComponent;
  let fixture: ComponentFixture<FooterPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
