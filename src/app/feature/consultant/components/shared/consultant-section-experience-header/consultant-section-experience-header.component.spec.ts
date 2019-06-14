import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSectionExperienceHeaderComponent } from './consultant-section-experience-header.component';

describe('ConsultantSectionExperienceHeaderComponent', () => {
  let component: ConsultantSectionExperienceHeaderComponent;
  let fixture: ComponentFixture<ConsultantSectionExperienceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSectionExperienceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSectionExperienceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
