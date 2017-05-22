import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadBarchartComponent } from './pad-barchart.component';

describe('PadBarchartComponent', () => {
  let component: PadBarchartComponent;
  let fixture: ComponentFixture<PadBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
