import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-col-palette',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container muted">
        <p>Colour Palettes</p>
        <mat-nav-list>
          <a mat-list-item [routerLink]="['./actors-cols']" routerLinkActive="active">Actors colors</a>
          <a mat-list-item [routerLink]="['./han-cols-theme1']" routerLinkActive="active">Hannah colors theme 1</a>
          <a mat-list-item [routerLink]="['./sar-cols-theme1']" routerLinkActive="active">Sarah colors theme 1</a>
          <a mat-list-item [routerLink]="['./joe-cols-theme1']" routerLinkActive="active">Joel colors theme 1</a>
          <a mat-list-item [routerLink]="['./han-svg-cols']" routerLinkActive="active">Hannah colors SVG</a>
          <a mat-list-item [routerLink]="['./joe-svg-cols']" routerLinkActive="active">Joel colors SVG</a>
          <a mat-list-item [routerLink]="['./sar-svg-cols']" routerLinkActive="active">Sarah colors SVG</a>
          <a mat-list-item [routerLink]="['./han-hex-colors']" routerLinkActive="active">Hannah hex colors (MD)</a>
        </mat-nav-list>
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
