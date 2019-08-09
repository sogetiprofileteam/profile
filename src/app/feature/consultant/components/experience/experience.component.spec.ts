import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExperienceComponent } from './consultant-experience.component';

describe('ConsultantExperienceComponent', () => {
  let component: ConsultantExperienceComponent;
  let fixture: ComponentFixture<ConsultantExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
