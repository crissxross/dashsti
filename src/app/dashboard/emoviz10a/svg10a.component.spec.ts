import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg10aComponent } from './svg10a.component';

describe('Svg10aComponent', () => {
  let component: Svg10aComponent;
  let fixture: ComponentFixture<Svg10aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Svg10aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg10aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
