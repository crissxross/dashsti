import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz8Component } from './emoviz8.component';

describe('Emoviz8Component', () => {
  let component: Emoviz8Component;
  let fixture: ComponentFixture<Emoviz8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
