import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanColorsComponent } from './han-colors.component';

describe('HanColorsComponent', () => {
  let component: HanColorsComponent;
  let fixture: ComponentFixture<HanColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
