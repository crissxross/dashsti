import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSceneComponent } from './dash-scene.component';

describe('DashSceneComponent', () => {
  let component: DashSceneComponent;
  let fixture: ComponentFixture<DashSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
