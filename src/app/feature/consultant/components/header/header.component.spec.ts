import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantHeaderComponent } from './consultant-header.component';

describe('ConsultantHeaderComponent', () => {
  let component: ConsultantHeaderComponent;
  let fixture: ComponentFixture<ConsultantHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
