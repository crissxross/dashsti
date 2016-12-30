import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  template: `
    <p>npc</p>
    <app-actorviz class="npc-viz"></app-actorviz>
  `,
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
