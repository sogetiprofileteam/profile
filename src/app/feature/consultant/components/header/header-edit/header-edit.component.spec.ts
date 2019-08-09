import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEditComponent } from './header-edit.component';

describe('ConsultantHeaderComponent', () => {
  let component: HeaderEditComponent;
  let fixture: ComponentFixture<HeaderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
