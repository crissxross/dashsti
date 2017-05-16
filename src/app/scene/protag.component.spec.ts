/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProtagComponent } from './protag.component';

describe('ProtagComponent', () => {
  let component: ProtagComponent;
  let fixture: ComponentFixture<ProtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
