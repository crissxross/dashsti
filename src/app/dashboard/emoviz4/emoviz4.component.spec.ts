import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz4Component } from './emoviz4.component';

describe('Emoviz2Component', () => {
  let component: Emoviz4Component;
  let fixture: ComponentFixture<Emoviz4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
