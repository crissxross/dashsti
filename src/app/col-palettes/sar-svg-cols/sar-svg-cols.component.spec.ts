import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarSvgColsComponent } from './sar-svg-cols.component';

describe('SarSvgColsComponent', () => {
  let component: SarSvgColsComponent;
  let fixture: ComponentFixture<SarSvgColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SarSvgColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarSvgColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
