import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz5Component } from './emoviz5.component';

describe('Emoviz5Component', () => {
  let component: Emoviz5Component;
  let fixture: ComponentFixture<Emoviz5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
