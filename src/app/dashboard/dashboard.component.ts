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
              [pValue]="pleasureValue"
              [aValue]="arousalValue"
              [dValue]="dominanceValue"
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
          <li>Pleasure: {{pleasureValue}}%</li>
          <li>Arousal: {{arousalValue}}%</li>
          <li>Dominance: {{dominanceValue}}%</li>
        </ul>
        <!--<app-uicontrols></app-uicontrols>-->
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pleasureValue = 0;
  arousalValue = 0;
  dominanceValue = 0;

  constructor() { }

  ngOnInit() {
  }

  changeP(event) {
    this.pleasureValue = event;
    // console.log('Dashboard changeP: ', event);
  }

  changeA(event) {
    this.arousalValue = event;
    // console.log('Dashboard changeA: ', event);
  }

  changeD(event) {
    this.dominanceValue = event;
    // console.log('Dashboard changeD: ', event);
  }

}
