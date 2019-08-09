import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSummaryEditComponent } from './consultant-summary-edit.component';

describe('ConsultantSummaryEditComponent', () => {
  let component: ConsultantSummaryEditComponent;
  let fixture: ComponentFixture<ConsultantSummaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSummaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSummaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
