import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExperienceFormComponent } from './consultant-experience-form.component';

describe('ConsultantExperienceFormComponent', () => {
  let component: ConsultantExperienceFormComponent;
  let fixture: ComponentFixture<ConsultantExperienceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExperienceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExperienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
