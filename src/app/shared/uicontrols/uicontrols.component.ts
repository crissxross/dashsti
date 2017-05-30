import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-uicontrols',
  template: `
      <!--
    <div>Dashboard UI controls</div>
    <br>
      -->
      <button md-raised-button (click)="showAndReset()">
        {{show ? 'Reset & hide sliders' : 'Show PAD sliders'}}
      </button>
    <div class="pad-slider-container" *ngIf="show">
      <div>P
        <md-slider #P min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onPleasureChange($event)"
        ></md-slider>
        {{P.value | number}}
      </div>
      <div>A
        <md-slider #A min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onArousalChange($event)"
        ></md-slider>
        {{A.value | number}}
      </div>
      <div>D
        <md-slider #D min=-1 max=1 value=0 step=0.1 tickInterval=1
        (change)="onDominanceChange($event)"
        ></md-slider>
        {{D.value | number}}
      </div>

    </div>
    <!--<small>show = {{show}}</small>-->
  `,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent {
  @Output() Pleasure = new EventEmitter();
  @Output() Arousal = new EventEmitter();
  @Output() Dominance = new EventEmitter();
  // value = 0;
  show = true;

  constructor(private store: Store<fromRoot.State>) {}

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
    this.store.dispatch(new PadActions.Reset());
  }

}
// NOTE -USE SHOW/HIDE BUTTON TO RESET PAD VALUES TO TRY TO KEEP ALL IN SYNC!!!
  // Reset button/function does not reset UI md-sliders.
  // If I want to reset, might need to use ng Form controls ??
