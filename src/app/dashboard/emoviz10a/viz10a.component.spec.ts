import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz10aComponent } from './viz10a.component';

describe('Viz10aComponent', () => {
  let component: Viz10aComponent;
  let fixture: ComponentFixture<Viz10aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viz10aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz10aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
