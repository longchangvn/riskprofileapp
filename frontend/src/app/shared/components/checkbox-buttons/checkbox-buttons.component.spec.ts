import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxButtonsComponent } from './checkbox-buttons.component';

describe('CheckboxButtonsComponent', () => {
  let component: CheckboxButtonsComponent;
  let fixture: ComponentFixture<CheckboxButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
