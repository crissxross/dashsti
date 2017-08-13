import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz9Component } from './viz9.component';

describe('Viz9Component', () => {
  let component: Viz9Component;
  let fixture: ComponentFixture<Viz9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viz9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
