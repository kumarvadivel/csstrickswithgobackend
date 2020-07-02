import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSubsiteComponent } from './footer-subsite.component';

describe('FooterSubsiteComponent', () => {
  let component: FooterSubsiteComponent;
  let fixture: ComponentFixture<FooterSubsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSubsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSubsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
