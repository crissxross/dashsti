import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz3Component } from './emoviz3.component';

describe('Emoviz3Component', () => {
  let component: Emoviz3Component;
  let fixture: ComponentFixture<Emoviz3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
