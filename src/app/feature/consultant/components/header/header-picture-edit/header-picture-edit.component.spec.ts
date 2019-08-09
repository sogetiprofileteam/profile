import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPictureEditComponent } from './header-picture-edit.component';

describe('ConsultantPictureEditComponent', () => {
  let component: HeaderPictureEditComponent;
  let fixture: ComponentFixture<HeaderPictureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPictureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPictureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
