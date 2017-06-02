import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HannahColsComponent } from './hannah-cols.component';

describe('HannahColsComponent', () => {
  let component: HannahColsComponent;
  let fixture: ComponentFixture<HannahColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HannahColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HannahColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
