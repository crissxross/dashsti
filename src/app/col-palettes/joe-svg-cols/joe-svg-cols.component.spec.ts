import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoeSvgColsComponent } from './joe-svg-cols.component';

describe('JoeSvgColsComponent', () => {
  let component: JoeSvgColsComponent;
  let fixture: ComponentFixture<JoeSvgColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoeSvgColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoeSvgColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
