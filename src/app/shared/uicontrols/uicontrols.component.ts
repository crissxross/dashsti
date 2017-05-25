import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uicontrols',
  template: `
    <div>Dashboard UI controls</div>
    <div class="pad-slider-container">
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
`,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent {
  @Output() Pleasure = new EventEmitter();
  @Output() Arousal = new EventEmitter();
  @Output() Dominance = new EventEmitter();

  constructor() {}

  onPleasureChange(event) {
    this.Pleasure.emit(event.value);
  }

  onArousalChange(event) {
    this.Arousal.emit(event.value);
  }

  onDominanceChange(event) {
    this.Dominance.emit(event.value);
  }

}
  // Reset button/function does not reset UI md-sliders.
  // If I want to reset, might need to use ng Form controls ??
