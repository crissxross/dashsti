import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <md-nav-list>
      <a md-list-item [routerLink]="['/dashboard']">Dashboard</a>
      <a md-list-item [routerLink]="['/dash-scene']">Dash: scene layout</a>
      <a md-list-item [routerLink]="['/han-colors']">Hannah's colours</a>
    </md-nav-list>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
