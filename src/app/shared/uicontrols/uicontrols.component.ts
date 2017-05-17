import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uicontrols',
  template: `
    <div>Dashboard UI</div>
    <div>P
      <md-slider class="Pleasure" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel (change)="onPleasureChange($event)"></md-slider>
      {{Pleasure}}
    </div>
    <div>A
      <md-slider class="Arousal" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel (change)="onArousalChange($event)"></md-slider>
      {{Arousal}}
    </div>
    <div>D
      <md-slider class="Dominance" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel (change)="onDominanceChange($event)"></md-slider>
      {{Dominance}}
    </div>
`,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent implements OnInit {
  Pleasure: number;
  Arousal: number;
  Dominance: number;

  constructor() { }

  ngOnInit() {
  }

  onPleasureChange(event) {
    this.Pleasure = event.value;
    // console.log('Pleasure value changed to: ', event.value);
  }

  onArousalChange(event) {
    this.Arousal = event.value;
    // console.log('Arousal value changed to: ', event.value);
  }

  onDominanceChange(event) {
    this.Dominance = event.value;
    // console.log('Dominance value changed to: ', event.value);
  }

}
