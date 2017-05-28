import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmovizComponent } from './emoviz.component';

describe('EmovizComponent', () => {
  let component: EmovizComponent;
  let fixture: ComponentFixture<EmovizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmovizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmovizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
