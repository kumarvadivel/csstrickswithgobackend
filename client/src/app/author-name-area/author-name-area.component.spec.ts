import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNameAreaComponent } from './author-name-area.component';

describe('AuthorNameAreaComponent', () => {
  let component: AuthorNameAreaComponent;
  let fixture: ComponentFixture<AuthorNameAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorNameAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorNameAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
