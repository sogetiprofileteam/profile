import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNewButtonComponent } from './save-new-button.component';

describe('SaveNewButtonComponent', () => {
  let component: SaveNewButtonComponent;
  let fixture: ComponentFixture<SaveNewButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveNewButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveNewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
