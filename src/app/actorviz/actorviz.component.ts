import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actorviz',
  // templateUrl: './actorviz.component.html',
  template: `
    <div class="viz-container">
      <p>actorviz</p>
      <p>P: {{pValue}} | A: {{aValue}} | D: {{dValue}}</p>

      <div class="pad-bar-chart">
        <div class="pos-bars">
          <div class="bar p-pos"></div>
          <div class="bar a-pos"></div>
          <div class="bar d-pos"></div>
        </div>
        <div class="x-axis"></div>
        <div class="neg-bars">
          <div class="bar p-neg"></div>
          <div class="bar a-neg"></div>
          <div class="bar d-neg"></div>
        </div>
      </div>

      <p>Maybe do this with SVG & GSAP instead of divs as above.</p>

    </div>
  `,
  styleUrls: ['./actorviz.component.css']
})
export class ActorvizComponent implements OnInit {
  @Input() pValue;
  @Input() aValue;
  @Input() dValue;

  constructor() { }

  ngOnInit() {
  }

}
