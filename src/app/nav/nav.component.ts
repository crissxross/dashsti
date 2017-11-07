import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-nav-list>
      <a mat-list-item [routerLink]="['/dashboard']">Dashboard</a>
      <a mat-list-item [routerLink]="['/col-palettes']">Colour palettes</a>
      <a mat-list-item [routerLink]="['/dash-scene']">Dash: scene layout</a>
    </mat-nav-list>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
