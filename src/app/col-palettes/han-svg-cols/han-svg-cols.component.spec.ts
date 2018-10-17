import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanSvgColsComponent } from './han-svg-cols.component';

describe('HanSvgColsComponent', () => {
  let component: HanSvgColsComponent;
  let fixture: ComponentFixture<HanSvgColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanSvgColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanSvgColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
