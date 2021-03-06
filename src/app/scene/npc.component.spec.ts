/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NpcComponent } from './npc.component';

describe('NpcComponent', () => {
  let component: NpcComponent;
  let fixture: ComponentFixture<NpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
