import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSectionComponent } from './consultant-section-header.component';

describe('ConsultantSectionComponent', () => {
  let component: ConsultantSectionComponent;
  let fixture: ComponentFixture<ConsultantSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
