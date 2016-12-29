import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  template: `
    <p>
      player Works!
    </p>
    <app-actorviz></app-actorviz>
  `,
  // styles: [':host {border: solid 2px cadetblue; }']
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
