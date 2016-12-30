import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  template: `
    <p>player speaks here</p>
    <app-actorviz fxFlexAlign="end" class="player-viz"></app-actorviz>
    <p>(player thoughts & options here)</p>
  `,
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
