import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-col-palette',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container muted">
        <p>col-palette Works!</p>
      </div>

      <div class="main-content-container">
        <router-outlet></router-outlet>
      </div>

      <div class="sidepanel-container">
      </div>

    </div>
  `,
  styleUrls: ['./col-palette.component.css']
})
export class ColPaletteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
