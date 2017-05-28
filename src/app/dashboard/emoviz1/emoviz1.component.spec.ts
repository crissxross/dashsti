import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz1Component } from './emoviz1.component';

describe('Emoviz1Component', () => {
  let component: Emoviz1Component;
  let fixture: ComponentFixture<Emoviz1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
