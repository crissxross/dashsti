import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Particle } from '../particle';

@Component({
  selector: 'app-viz10',
  template: `
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Viz10Component implements OnChanges {
  @Input() particles: Particle[];
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  @Input() particleWidth: number;
  @Input() particleHeight: number;
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @ViewChild('canvas', {static: false}) canvasRef: ElementRef;

  S: number;
  L: number;
  sFill: number;
  lFill: number;

  constructor() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // console.log('P A D:', this.P, this.A, this.D);
    this.S = 50 + Math.round(this.D * 40); // 10 to 90
    this.L = 50 - Math.round(this.D * 40); // 90 to 10
    this.sFill = 30 + Math.round(this.D * 20); // 10 to 50
    this.lFill = 15 - Math.round(this.D * 10); // 25 to 5
    // console.log('S:', this.S, 'L:', this.L, 'sFill:', this.sFill, 'lFill:', this.lFill);

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = `hsl(137, ${this.sFill}%, ${this.lFill}%)`; // 137 green
    ctx.fillRect(0, 0, 400, 333);

    // Draw the particles given as input
    ctx.beginPath();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = `hsl(137, ${this.S}%, ${this.L}%)`;
    for (const {x, y} of this.particles) {
      ctx.moveTo(x, y);
      ctx.rect(x, y, this.particleWidth, this.particleHeight);
    }
    ctx.fill();
  }


}
