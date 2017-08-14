import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz10Component } from './emoviz10.component';

describe('Emoviz10Component', () => {
  let component: Emoviz10Component;
  let fixture: ComponentFixture<Emoviz10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
