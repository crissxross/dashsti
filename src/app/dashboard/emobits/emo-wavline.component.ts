import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-emo-wavline]',
  template: `
    <p>
      emo-wavline Works!
    </p>
    <svg:path #emoLine d="
      M 0 100
      c 10 -10, 40 -10, 50 0
      c 10 10, 40 10, 50 0
      c 10 -10, 40 -10, 50 0
      c 10 10, 40 10, 50 0
      c 10 -10, 40 -10, 50 0
      c 10 10, 40 10, 50 0
      c 10 -10, 40 -10, 50 0
      c 10 10, 40 10, 50 0
    "/>
  `,
  styles: [`path {fill: none; stroke: red; }`]
})
export class EmoWavlineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
