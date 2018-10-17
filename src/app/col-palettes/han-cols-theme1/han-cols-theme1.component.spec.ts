import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanColsTheme1Component } from './han-cols-theme1.component';

describe('HanColsTheme1Component', () => {
  let component: HanColsTheme1Component;
  let fixture: ComponentFixture<HanColsTheme1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanColsTheme1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanColsTheme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
