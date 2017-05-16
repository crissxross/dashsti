import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene',
  template: `
    <div fxLayout="column" fxFlex="50" class="actorContainer">
      <app-npc fxLayout="column" fxLayoutAlign="space-between" fxFlex></app-npc>
    </div>
    <div fxLayout="column" fxFlex="50" class="actorContainer">
      <app-protag fxLayout="column" fxLayoutAlign="space-between" fxFlex></app-protag>
    </div>
  `,
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
