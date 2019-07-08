import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEduCertSectionHeaderComponent } from './consultant-edu-cert-section-header.component';

describe('ConsultantEduCertSectionHeaderComponent', () => {
  let component: ConsultantEduCertSectionHeaderComponent;
  let fixture: ComponentFixture<ConsultantEduCertSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEduCertSectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEduCertSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
