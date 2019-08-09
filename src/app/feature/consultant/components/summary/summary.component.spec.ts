import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSummaryComponent } from './consultant-summary.component';

describe('ConsultantSummaryComponent', () => {
  let component: ConsultantSummaryComponent;
  let fixture: ComponentFixture<ConsultantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
