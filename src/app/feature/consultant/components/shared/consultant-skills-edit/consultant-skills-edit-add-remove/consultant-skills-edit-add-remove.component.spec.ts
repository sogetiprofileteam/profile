import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSkillsEditAddRemoveComponent } from './consultant-skills-edit-add-remove.component';

describe('ConsultantSkillsEditAddRemoveComponent', () => {
  let component: ConsultantSkillsEditAddRemoveComponent;
  let fixture: ComponentFixture<ConsultantSkillsEditAddRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSkillsEditAddRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSkillsEditAddRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
