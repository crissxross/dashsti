import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz6Component } from './emoviz6.component';

describe('Emoviz6Component', () => {
  let component: Emoviz6Component;
  let fixture: ComponentFixture<Emoviz6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
