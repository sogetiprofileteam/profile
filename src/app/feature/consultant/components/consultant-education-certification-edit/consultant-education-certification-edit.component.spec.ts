import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationEditComponent } from './consultant-education-certification-edit.component';

describe('ConsultantEducationCertificationEditComponent', () => {
  let component: ConsultantEducationCertificationEditComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
