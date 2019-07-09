import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSkillsEditComponent } from './consultant-skills-edit.component';

describe('ConsultantSkillsEditComponent', () => {
  let component: ConsultantSkillsEditComponent;
  let fixture: ComponentFixture<ConsultantSkillsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSkillsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSkillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
