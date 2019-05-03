import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSkillsEditReorderDisplayComponent } from './consultant-skills-edit-reorder-display.component';

describe('ConsultantSkillsEditReorderDisplayComponent', () => {
  let component: ConsultantSkillsEditReorderDisplayComponent;
  let fixture: ComponentFixture<ConsultantSkillsEditReorderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSkillsEditReorderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSkillsEditReorderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
