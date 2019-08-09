import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsDeleteDialogComponent } from './consultant-education-certifications-delete-dialog.component';

describe('ConsultantEducationCertificationsDeleteDialogComponent', () => {
  let component: ConsultantEducationCertificationsDeleteDialogComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
