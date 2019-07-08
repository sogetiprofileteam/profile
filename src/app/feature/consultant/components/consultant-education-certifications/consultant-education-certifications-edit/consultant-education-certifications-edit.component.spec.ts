import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsEditComponent } from './consultant-education-certifications-edit.component';

describe('ConsultantEducationCertificationEditComponents', () => {
  let component: ConsultantEducationCertificationsEditComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
