/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActorvizComponent } from './actorviz.component';

describe('ActorvizComponent', () => {
  let component: ActorvizComponent;
  let fixture: ComponentFixture<ActorvizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorvizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorvizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
