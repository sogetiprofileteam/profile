import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSectionHeaderComponent } from './consultant-section-header.component';

describe('ConsultantSectionComponent', () => {
  let component: ConsultantSectionHeaderComponent;
  let fixture: ComponentFixture<ConsultantSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
