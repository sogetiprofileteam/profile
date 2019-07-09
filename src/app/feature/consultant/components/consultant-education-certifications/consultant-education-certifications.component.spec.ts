import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultantEducationCertificationsComponent } from './consultant-education-certifications.component';

describe('ConsultantEducationCertificationsComponent', () => {
  let component: ConsultantEducationCertificationsComponent;
  let fixture: ComponentFixture<ConsultantEducationCertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEducationCertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEducationCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
