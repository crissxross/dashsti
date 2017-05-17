import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  template: `
        <div class="npc">
      <div class="speaks-container">
        <div class="npc-speaks">
          <!--{{ npcSpeak }}-->
          Dummy text for npc
        </div>
      </div>
    </div>
<!-- WHERE DOES ACTORVIZ GO? -->
    <!--<app-actorviz class="npc-viz"></app-actorviz>-->
  `,
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
