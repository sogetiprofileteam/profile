import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExperienceCreateComponent } from './consultant-experience-create.component';

describe('ConsultantExperienceCreateComponent', () => {
  let component: ConsultantExperienceCreateComponent;
  let fixture: ComponentFixture<ConsultantExperienceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExperienceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
