import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsEditComponents } from './consultant-education-certifications-edit.component';

describe('ConsultantEducationCertificationEditComponents', () => {
  let component: ConsultantEducationCertificationsEditComponents;
  let fixture: ComponentFixture<ConsultantEducationCertificationsEditComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsEditComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsEditComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
