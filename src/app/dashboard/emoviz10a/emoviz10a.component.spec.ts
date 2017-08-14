import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz10aComponent } from './emoviz10a.component';

describe('Emoviz10aComponent', () => {
  let component: Emoviz10aComponent;
  let fixture: ComponentFixture<Emoviz10aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz10aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz10aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
