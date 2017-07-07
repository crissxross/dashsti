import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-emo-zzline]',
  template: `
    <svg:path d="
      M -25 107
      l 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15, 50 -15, 50 15"/>
  `,
  styles: [`path {fill: none; stroke: green; }`]
})
export class EmoZZlineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
