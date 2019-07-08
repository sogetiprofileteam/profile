import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEducationCertificationsEditItemComponent } from './consultant-education-certifications-edit-item.component';

describe('ConsultantEducationCertificationsEditItemComponent', () => {
  let component: ConsultantEducationCertificationsEditItemComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
