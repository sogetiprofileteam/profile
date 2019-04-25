import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDisplaySkillsOrderComponent } from './consultant-display-skills-order.component';

describe('ConsultantDisplaySkillsOrderComponent', () => {
  let component: ConsultantDisplaySkillsOrderComponent;
  let fixture: ComponentFixture<ConsultantDisplaySkillsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantDisplaySkillsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantDisplaySkillsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
