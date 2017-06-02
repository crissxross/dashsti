import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-col-palette',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container muted">
        <p>Colour Palettes</p>
        <md-nav-list>
          <a md-list-item [routerLink]="['/hannah-cols']" routerLinkActive="active">Hannah colors SVG</a>
          <a md-list-item [routerLink]="['/joel-cols']" routerLinkActive="active">Joel colors SVG</a>
          <a md-list-item [routerLink]="['/sarah-cols']" routerLinkActive="active">Sarah colors SVG</a>
          <a md-list-item [routerLink]="['/han-colors']" routerLinkActive="active">Hannah colors (MD)</a>
        </md-nav-list>
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
