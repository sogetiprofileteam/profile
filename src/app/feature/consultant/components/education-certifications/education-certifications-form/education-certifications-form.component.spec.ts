import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsFormComponent } from './consultant-education-certifications-form.component';

describe('ConsultantEducationCertificationsFormComponent', () => {
  let component: ConsultantEducationCertificationsFormComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
