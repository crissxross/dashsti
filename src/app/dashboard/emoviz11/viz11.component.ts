import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Emote } from '../e-mote';
import { degreesToRadians } from '../../shared/utils';

@Component({
  selector: 'app-viz11',
  template: `
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: []
})
export class Viz11Component implements OnChanges {
  @Input() emotes: Emote[];
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  // @Input() particleWidth: number;
  // @Input() particleHeight: number;
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @ViewChild('canvas') canvasRef: ElementRef;

  S: number;
  L: number;
  sFill: number;
  lFill: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  // spotX = 0; // < just for testing

  constructor() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // this.spotX++; // < just for testing

    // console.log('P A D:', this.P, this.A, this.D);
    this.endAngle = 115 + Math.round(this.P * 100); // 15 to 215
    this.radius = 22 + Math.round(this.A * 20); // 5 to 45
    this.S = 50 + Math.round(this.D * 40); // 10 to 90
    this.L = 50 - Math.round(this.D * 40); // 90 to 10
    this.sFill = 30 + Math.round(this.D * 20); // 10 to 50
    this.lFill = 15 - Math.round(this.D * 10); // 25 to 5
    // console.log('S:', this.S, 'L:', this.L, 'sFill:', this.sFill, 'lFill:', this.lFill);
    // console.log('endAngle:', this.endAngle);

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = `hsl(137, ${this.sFill}%, ${this.lFill}%)`; // 137 green
    ctx.fillRect(0, 0, 400, 333);

    // Draw the emotes given as input
    ctx.beginPath();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = `hsl(0, ${this.S}%, ${this.L}%)`;
    for (const {x, y} of this.emotes) {
      ctx.moveTo(x, y);
      this.drawArc(ctx, x, y, this.radius, 0, this.endAngle);
    }
    // ctx.arc(this.spotX, 20, 10, 0, Math.PI * 2); // < just for testing
    ctx.fill();
  }

  drawArc(ctx, x, y, radius, startingAngle, endingAngle) {
    ctx.arc(x, y, radius, degreesToRadians(startingAngle), degreesToRadians(endingAngle));
  }

}
