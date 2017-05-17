import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-scene',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <p>Scene layout</p>
      </div>

      <div class="content-container">
        <app-scene></app-scene>
      </div>

      <div class="sidepanel-container">
        <app-uicontrols></app-uicontrols>
      </div>

    </div>
  `,
  styleUrls: ['./dash-scene.component.css']
})
export class DashSceneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
