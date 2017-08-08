import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz7Component } from './emoviz7.component';

describe('Emoviz7Component', () => {
  let component: Emoviz7Component;
  let fixture: ComponentFixture<Emoviz7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
