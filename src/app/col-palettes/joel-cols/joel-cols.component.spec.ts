import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoelColsComponent } from './joel-cols.component';

describe('JoelColsComponent', () => {
  let component: JoelColsComponent;
  let fixture: ComponentFixture<JoelColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoelColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoelColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
