import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz3bComponent } from './emoviz3b.component';

describe('Emoviz3bComponent', () => {
  let component: Emoviz3bComponent;
  let fixture: ComponentFixture<Emoviz3bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz3bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz3bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
