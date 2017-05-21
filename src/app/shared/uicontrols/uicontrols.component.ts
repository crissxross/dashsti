import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uicontrols',
  template: `
    <div>Dashboard UI controls</div>
    <div class="pad-slider-container">
      <div>P
        <md-slider #P min=-100 max=100 value=0 step=10 tickInterval=1
        (change)="onPleasureChange($event)"
        ></md-slider>
        {{P.value}} %
      </div>
      <div>A
        <md-slider #A min=-100 max=100 value=0 step=10 tickInterval=1
        (change)="onArousalChange($event)"
        ></md-slider>
        {{A.value}} %
      </div>
      <div>D
        <md-slider #D min=-100 max=100 value=0 step=10 tickInterval=1
        (change)="onDominanceChange($event)"
        ></md-slider>
        {{D.value}} %
      </div>
    </div>
`,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent implements OnInit {
  @Output() Pleasure = new EventEmitter();
  @Output() Arousal = new EventEmitter();
  @Output() Dominance = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPleasureChange(event) {
    this.Pleasure.emit(event.value);
    // console.log('UI emits Pleasure: ', this.Pleasure);
    // console.log('the event: ', event);
  }

  onArousalChange(event) {
    this.Arousal.emit(event.value);
    // console.log('Arousal: ', this.Arousal);
  }

  onDominanceChange(event) {
    this.Dominance.emit(event.value);
    // console.log('Dominance: ', this.Dominance);
  }

}
