import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantHeaderEditComponent } from './consultant-header-edit.component';

describe('ConsultantHeaderComponent', () => {
  let component: ConsultantHeaderEditComponent;
  let fixture: ComponentFixture<ConsultantHeaderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantHeaderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantHeaderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
