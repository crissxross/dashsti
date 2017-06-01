import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColPaletteComponent } from './col-palette.component';

describe('ColPaletteComponent', () => {
  let component: ColPaletteComponent;
  let fixture: ComponentFixture<ColPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
