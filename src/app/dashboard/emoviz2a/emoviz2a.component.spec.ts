import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz2aComponent } from './emoviz2a.component';

describe('Emoviz2aComponent', () => {
  let component: Emoviz2aComponent;
  let fixture: ComponentFixture<Emoviz2aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz2aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
