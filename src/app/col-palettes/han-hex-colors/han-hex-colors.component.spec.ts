import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanHexColorsComponent } from './han-hex-colors.component';

describe('HanHexColorsComponent', () => {
  let component: HanHexColorsComponent;
  let fixture: ComponentFixture<HanHexColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanHexColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanHexColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
