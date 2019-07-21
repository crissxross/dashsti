import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wavezz17',
  templateUrl: './wavezz17.component.svg',
  styleUrls: ['./wavezz17.component.css']
})
export class Wavezz17Component implements OnInit {
  viewportWidth = 100;
  viewportHeight = 120;
  // PAD
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;

  constructor() { }

  ngOnInit() {
  }

}
