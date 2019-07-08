import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsExistingEditComponent } from './consultant-education-certifications-existing-edit.component';

describe('ConsultantEducationCertificationsExistingEditComponent', () => {
  let component: ConsultantEducationCertificationsExistingEditComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsExistingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsExistingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsExistingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
