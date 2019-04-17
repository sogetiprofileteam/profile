import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantCoreSkillsComponent } from './consultant-core-skills.component';

describe('ConsultantSkillsComponent', () => {
  let component: ConsultantCoreSkillsComponent;
  let fixture: ComponentFixture<ConsultantCoreSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantCoreSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantCoreSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
