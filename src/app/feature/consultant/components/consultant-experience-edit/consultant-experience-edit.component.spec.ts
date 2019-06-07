import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExperienceEditComponent } from './consultant-experience-edit.component';

describe('ConsultantExperienceEditComponent', () => {
  let component: ConsultantExperienceEditComponent;
  let fixture: ComponentFixture<ConsultantExperienceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExperienceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExperienceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
