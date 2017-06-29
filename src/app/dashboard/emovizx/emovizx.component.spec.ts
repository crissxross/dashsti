import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmovizxComponent } from './emovizx.component';

describe('EmovizxComponent', () => {
  let component: EmovizxComponent;
  let fixture: ComponentFixture<EmovizxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmovizxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmovizxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
