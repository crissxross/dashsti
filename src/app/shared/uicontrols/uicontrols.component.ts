import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PadActions from '../../actions/pad.actions';
import * as fromPad from '../../reducers';

@Component({
  selector: 'app-uicontrols',
  template: `
    <button mat-raised-button (click)="showAndReset()">
      {{show ? 'Reset & hide sliders' : 'Show PAD sliders'}}
    </button>
    <div class="pad-slider-container" *ngIf="show">
      <div>P
        <mat-slider #P min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onPleasureChange($event)"
        ></mat-slider>
        {{P.value | number: '1.0-1'}}
      </div>
      <div>A
        <mat-slider #A min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onArousalChange($event)"
        ></mat-slider>
        {{A.value | number: '1.0-1'}}
      </div>
      <div>D
        <mat-slider #D min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onDominanceChange($event)"
        ></mat-slider>
        {{D.value | number: '1.0-1'}}
      </div>
    </div>
  `,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent {
  @Output() Pleasure = new EventEmitter();
  @Output() Arousal = new EventEmitter();
  @Output() Dominance = new EventEmitter();
  @Input() show: boolean;

  constructor(private store: Store<fromPad.State>) {}

  onPleasureChange(event) {
    this.Pleasure.emit(event.value);
  }

  onArousalChange(event) {
    this.Arousal.emit(event.value);
  }

  onDominanceChange(event) {
    this.Dominance.emit(event.value);
  }

  showAndReset() {
    this.show = !this.show;
    this.store.dispatch(PadActions.reset());
  }
}
/**
 * Note: show/hide & reset UI slider controls functionality
 * does not keep all UI perfectly in sync but it will suffice.
 */
