import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  template: `
    <div class="npc">
<!-- WHERE DOES ACTORVIZ GO? -->
      <!--<div class="npc-viz-container">
        <app-actorviz class="npc-viz"></app-actorviz>
      </div>-->
      <div class="speaks-container">
        <div class="npc-speaks">
          <!--{{ npcSpeak }}-->
          Dummy text for npc speaks
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
