import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg10Component } from './svg10.component';

describe('Svg10Component', () => {
  let component: Svg10Component;
  let fixture: ComponentFixture<Svg10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Svg10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
