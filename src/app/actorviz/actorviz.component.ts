import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actorviz',
  template: `
    <p>actorviz</p>
    <p>P: {{pValue}} | A: {{aValue}} | D: {{dValue}}</p>
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
