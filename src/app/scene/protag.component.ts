import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protag',
  template: `
    <p>protag speaks here</p>
    <app-actorviz fxFlexAlign="end" class="protag-viz"></app-actorviz>
    <p>(player thoughts & options here)</p>
  `,
  styleUrls: ['./protag.component.css']
})
export class ProtagComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
