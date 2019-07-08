import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantPictureEditComponent } from './consultant-picture-edit.component';

describe('ConsultantPictureEditComponent', () => {
  let component: ConsultantPictureEditComponent;
  let fixture: ComponentFixture<ConsultantPictureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantPictureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantPictureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
