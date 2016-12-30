import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  template: `
    <app-actorviz fxFlexAlign="end" class="npc-viz"></app-actorviz>
    <p>npc speaks here</p>
  `,
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
