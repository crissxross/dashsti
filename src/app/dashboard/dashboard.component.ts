import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <p>side panel</p>
      </div>

      <div class="content-container">
        <app-scene></app-scene>
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
