import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uicontrols',
  template: `
    <div>Dashboard UI</div>
    <div>P
      <md-slider class="Pleasure" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel></md-slider>
    </div>
    <div>A
      <md-slider class="Arousal" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel></md-slider>
    </div>
    <div>D
      <md-slider class="Dominance" min=-5 max=5 value=0 step=1 tickInterval=1 thumbLabel></md-slider>
    </div>
`,
  styleUrls: ['./uicontrols.component.css']
})
export class UicontrolsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
