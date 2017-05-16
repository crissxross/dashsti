import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <!--<p>nav links</p>-->
    <nav fxLayout="column">
      <a md-button [routerLink]="['/dashboard']">Dashboard</a>
      <a md-button routerLink=".">Flat button</a>
      <a md-button routerLink=".">nav link</a>
      <!--<ul>
        <li><a href="" [routerLink]="['/dashboard']">Dashboard</a></li>
        <li>another link</li>
      </ul>-->
    </nav>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
