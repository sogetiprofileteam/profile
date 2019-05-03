import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantBodyComponent } from './consultant-body.component';

describe('ConsultantBodyComponent', () => {
  let component: ConsultantBodyComponent;
  let fixture: ComponentFixture<ConsultantBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
