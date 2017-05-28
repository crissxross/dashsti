import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actorviz',
  template: `
    <div class="viz-container">

      <app-emoviz3 [bg]="bg"></app-emoviz3>

      <router-outlet></router-outlet>

    </div>
  `,
  styleUrls: ['./actorviz.component.css']
})
export class ActorvizComponent implements OnInit {
  @Input() bg;

  constructor() {}

  ngOnInit() {
  }

}
