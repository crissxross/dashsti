import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz7aComponent } from './emoviz7a.component';

describe('Emoviz7aComponent', () => {
  let component: Emoviz7aComponent;
  let fixture: ComponentFixture<Emoviz7aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz7aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz7aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
