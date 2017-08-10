import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz7bComponent } from './emoviz7b.component';

describe('Emoviz7bComponent', () => {
  let component: Emoviz7bComponent;
  let fixture: ComponentFixture<Emoviz7bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz7bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz7bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
