import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmovizzComponent } from './emovizz.component';

describe('EmovizzComponent', () => {
  let component: EmovizzComponent;
  let fixture: ComponentFixture<EmovizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmovizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmovizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
