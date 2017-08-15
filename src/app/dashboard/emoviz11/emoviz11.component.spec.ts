import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz11Component } from './emoviz11.component';

describe('Emoviz11Component', () => {
  let component: Emoviz11Component;
  let fixture: ComponentFixture<Emoviz11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
