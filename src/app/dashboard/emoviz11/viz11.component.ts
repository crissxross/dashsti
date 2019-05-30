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
  // TODO: should this be {static: true} or {static: false} ?? I think true is correct because no errors now
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;

  S: number;
  L: number;
  sFill: number;
  lFill: number;
  radius: number;
  // startAngles = [260, 247, 234, 221, 208, 195, 182, 169, 156, 143, 130, 117, 104,  91,  78,  65,  52,  39,  26,  13,   0];
  // endAngles =   [270, 274, 278, 282, 286, 300, 304, 308, 312, 316, 320, 324, 328, 332, 336, 340, 344, 348, 352, 356, 360];
  angleId: number;
  // array of pairs of start & end angles - SOME ANGLES IN POS SCALE MAY STILL NEED ADJUSTING but almost there !!!!
  angles = [
    // -1 to -0.1
    [290, 300], [280, 300], [280, 310], [280, 320], [280, 330], [275, 335], [270, 340], [265, 345], [260, 350], [255, 355],
    // 0
    [270, 20],
    // 0.1 to 1
    [280, 40], [290, 60], [300, 90], [310, 130], [320, 150], [330, 170], [340, 200], [350, 240], [355, 300], [0, 360]
  ];
  // spotX = 0; // < just for testing

  constructor() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // this.spotX++; // < just for testing

    // console.log('P A D:', this.P, this.A, this.D);
    this.radius = 22 + Math.round(this.A * 20); // 5 to 45
    this.angleId = 10 + Math.round(this.P * 10); // 0 to 20
    this.S = 60 + Math.round(this.D * 40); // 20 to 100
    this.L = 40 - Math.round(this.D * 20); // 60 to 20
    this.sFill = 30 + Math.round(this.D * 20); // 10 to 50 : fillRect
    this.lFill = 15 - Math.round(this.D * 10); // 25 to 5 : fillRect
    // console.log('S:', this.S, 'L:', this.L, 'sFill:', this.sFill, 'lFill:', this.lFill);
    // console.log('angles:', this.angles[this.angleId][0], this.angles[this.angleId][1]);
    // console.log(this.angleId);

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = `hsl(137, ${this.sFill}%, ${this.lFill}%)`; // 137 green
    ctx.fillRect(0, 0, 400, 333);

    // Draw the emotes given as input
    ctx.beginPath();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = `hsl(0, ${this.S}%, ${this.L}%)`;
    for (const {x, y} of this.emotes) {
      ctx.moveTo(x, y);
      this.drawArc(ctx, x, y, this.radius, this.angles[this.angleId][0], this.angles[this.angleId][1]);
    }
    // ctx.arc(this.spotX, 20, 10, 0, Math.PI * 2); // < just for testing
    ctx.fill();
  }

  drawArc(ctx, x, y, radius, startAngle, endAngle) {
    ctx.arc(x, y, radius, degreesToRadians(startAngle), degreesToRadians(endAngle));
  }

}
