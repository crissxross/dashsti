import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  template: `
    <p>
      npc Works!
    </p>
    <app-actorviz></app-actorviz>
  `,
  // styles: [':host {border: solid 2px blue}']
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
