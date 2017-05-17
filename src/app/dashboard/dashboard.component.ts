import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <p class="muted">Dashboard for emo-viz experiments</p>
      </div>

      <div class="content-container">
        <app-actorviz></app-actorviz>
      </div>

      <div class="sidepanel-container">
        <app-uicontrols></app-uicontrols>
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
