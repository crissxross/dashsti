import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarahColsComponent } from './sarah-cols.component';

describe('SarahColsComponent', () => {
  let component: SarahColsComponent;
  let fixture: ComponentFixture<SarahColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SarahColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarahColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
