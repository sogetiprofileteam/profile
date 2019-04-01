import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSkillsComponent } from './consultant-skills.component';

describe('ConsultantSkillsComponent', () => {
  let component: ConsultantSkillsComponent;
  let fixture: ComponentFixture<ConsultantSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
