import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';

import { frames } from './pPos1radial';

@Component({
  selector: 'app-viz13',
  template: `
    <p>
      viz13 works!
    </p>
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: ['canvas {border: 1px dashed grey;}']
})
export class Viz13Component implements OnInit, OnDestroy {
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  // @Input() canvasWidth: number;
  // @Input() canvasHeight: number;
  @ViewChild('canvas') canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;
  canvasWidth = 100;
  canvasHeight = 100;
  // center
  cx = this.canvasWidth / 2;
  cy = this.canvasHeight / 2;
  frameSrcSize = 80;
  sprite = new Image();
  imageLoc = '../../../assets/pPos1radial.png';
  private running: boolean;

  emoteP = {
    frame: 0,
    // half width & height of frame sourcesize
    x: -this.frameSrcSize / 2,
    y: -this.frameSrcSize / 2
  };

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.running = true;
    // this.running = false;
    this.sprite.src = this.imageLoc;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.sprite.onload = () => this.ngZone.runOutsideAngular(() => this.animLoop());

    // TEMPORARY so that it doesn't run too long while testing
    setTimeout(() => this.running = false, 500);
  }

  animLoop() {
    console.log('animation loop running:', this.running);

    // rough idea of methods needed:
    this.update();
    this.render();
    // but maybe update calls render, passing it the updated frame index?

    if (this.running) {
      requestAnimationFrame(() => this.animLoop());
    }
  }

  // ROUGH IDEA of what's needed - see above
  update() {
    console.log('update the frame number to draw next sprite');
    // NOTE: see sprite-animation-demo for use of'ticksPerFrame' to govern animation speed - see article:
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  }

  render() {
    console.log('render the sprite frame');
    // NOTE - I'm not yet sure whether all this goes in render - should some be in update?
    // Or should update call render and pass it the updated frame index?
    const frame = frames[this.emoteP.frame];
    console.log('frames.length:', frames.length, 'this.emoteP.frame:', this.emoteP.frame, 'frame:', frame);

    const f = frame.frame;
    const source = frame.spriteSourceSize;
    // destination x, y
    const x = this.emoteP.x + source.x;
    const y = this.emoteP.y + source.y;

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // center the sprite
    this.ctx.translate(this.cx, this.cy);
    this.ctx.drawImage(this.sprite, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
    this.ctx.restore();
  }

  ngOnDestroy() {
    this.running = false;
    console.log('viz13 component destroyed! Running:', this.running);
  }

}
