import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emoviz7cComponent } from './emoviz7c.component';

describe('Emoviz7cComponent', () => {
  let component: Emoviz7cComponent;
  let fixture: ComponentFixture<Emoviz7cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emoviz7cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emoviz7cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
