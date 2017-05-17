import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <md-nav-list>
      <md-list-item>
        <a [routerLink]="['/dashboard']">Dashboard</a>
      </md-list-item>
      <md-list-item>
        <a routerLink=".">Flat button</a>
      </md-list-item>
      <md-list-item>
        <a routerLink=".">nav link</a>
      </md-list-item>
    </md-nav-list>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
