import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantViewComponent } from './consultant-view.component';

describe('ConsultantComponent', () => {
  let component: ConsultantViewComponent;
  let fixture: ComponentFixture<ConsultantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
