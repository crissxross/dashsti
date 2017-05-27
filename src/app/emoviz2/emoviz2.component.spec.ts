import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz2Component } from './emoviz2.component';

describe('Emoviz2Component', () => {
  let component: Emoviz2Component;
  let fixture: ComponentFixture<Emoviz2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
