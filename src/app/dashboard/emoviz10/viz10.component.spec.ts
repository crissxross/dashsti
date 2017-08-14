import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz10Component } from './viz10.component';

describe('Viz10Component', () => {
  let component: Viz10Component;
  let fixture: ComponentFixture<Viz10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viz10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
