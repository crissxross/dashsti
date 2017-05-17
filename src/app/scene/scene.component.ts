import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene',
  template: `
  <div class="scene">
    <div class="npc-container">
      <app-npc></app-npc>
    </div>
    <div class="protag-container">
      <app-protag></app-protag>
    </div>
    </div>
  `,
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
