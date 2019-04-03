import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantTechnicalSkillsComponent } from './consultant-technical-skills.component';

describe('ConsultantTechnicalSkillsComponent', () => {
  let component: ConsultantTechnicalSkillsComponent;
  let fixture: ComponentFixture<ConsultantTechnicalSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantTechnicalSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantTechnicalSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
