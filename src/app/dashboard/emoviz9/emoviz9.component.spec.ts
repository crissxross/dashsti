import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz9Component } from './emoviz9.component';

describe('Emoviz9Component', () => {
  let component: Emoviz9Component;
  let fixture: ComponentFixture<Emoviz9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
