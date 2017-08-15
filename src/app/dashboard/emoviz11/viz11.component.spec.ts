import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz11Component } from './viz11.component';

describe('Viz11Component', () => {
  let component: Viz11Component;
  let fixture: ComponentFixture<Viz11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viz11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
