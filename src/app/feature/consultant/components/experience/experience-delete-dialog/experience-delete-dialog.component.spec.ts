import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExperienceDeleteDialogComponent } from './consultant-experience-delete-dialog.component';

describe('ConsultantExperienceDeleteDialogComponent', () => {
  let component: ConsultantExperienceDeleteDialogComponent;
  let fixture: ComponentFixture<ConsultantExperienceDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExperienceDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExperienceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
