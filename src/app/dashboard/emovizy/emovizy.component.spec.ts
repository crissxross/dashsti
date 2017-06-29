import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmovizyComponent } from './emovizy.component';

describe('EmovizyComponent', () => {
  let component: EmovizyComponent;
  let fixture: ComponentFixture<EmovizyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmovizyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmovizyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
