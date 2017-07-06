import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz3aComponent } from './emoviz3a.component';

describe('Emoviz3aComponent', () => {
  let component: Emoviz3aComponent;
  let fixture: ComponentFixture<Emoviz3aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz3aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz3aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
