import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <p class="muted">Dashboard for emo-viz experiments</p>
      </div>

      <div class="content-container">
        <div class="content">
          <div class="actorviz-container">
            <app-actorviz
              [pValue]="pValue"
              [aValue]="aValue"
              [dValue]="dValue"
            ></app-actorviz>
          </div>
          <div class="ui-container">
            <app-uicontrols
            (Pleasure)="changeP($event)"
            (Arousal)="changeA($event)"
            (Dominance)="changeD($event)"
            ></app-uicontrols>
          </div>
        </div>
      </div>

      <div class="sidepanel-container">
        <h3 class="muted">P A D</h3>
        <ul>
          <li>Pleasure: {{pValue}}%</li>
          <li>Arousal: {{aValue}}%</li>
          <li>Dominance: {{dValue}}%</li>
        </ul>
        <!--<app-uicontrols></app-uicontrols>-->
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pValue = 0;
  aValue = 0;
  dValue = 0;

  constructor() { }

  ngOnInit() {
  }

  changeP(event) {
    this.pValue = event;
    // console.log('Dashboard changeP: ', event);
  }

  changeA(event) {
    this.aValue = event;
    // console.log('Dashboard changeA: ', event);
  }

  changeD(event) {
    this.dValue = event;
    // console.log('Dashboard changeD: ', event);
  }

}
