import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Particle } from './particle';

@Component({
  selector: 'app-viz9',
  template: `
    <canvas #canvas width="400" height="333"></canvas>
  `,
  // styles: [`canvas { border: 1px solid black; }`],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Viz9Component implements OnChanges {
  @Input() particles: Particle[];
  @ViewChild('canvas') canvasRef: ElementRef;

  constructor() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = 'hsl(137, 40%, 10%)';
    ctx.fillRect(0, 0, 400, 333);

    // Draw the points given as input
    ctx.beginPath();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'hsl(137, 60%, 20%)';
    for (const {x, y} of this.particles) {
      ctx.moveTo(x, y);
      ctx.rect(x, y, 20, 5);
    }
    ctx.fill();
  }

}
