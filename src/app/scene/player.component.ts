import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  template: `
    <p>player</p>
    <app-actorviz class="player-viz"></app-actorviz>
  `,
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
