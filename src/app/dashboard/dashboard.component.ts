import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-around">

      <div fxFlex class="sidepanel">
        <p>dashboard</p>
      </div>

      <app-scene fxLayout="column" fxLayoutAlign="space-between" fxFlex="405px"></app-scene>

      <div fxFlex class="sidepanel">
        <app-uicontrols fxLayout="column"></app-uicontrols>
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
