import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';

// import { frames } from '../spritesheet-data/pPos1radial';
import { frames } from '../spritesheet-data/pPos0.9';
import { getRandomInt } from '../../shared/utils';

interface Emote {
  frame: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-viz14',
  template: `
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: ['canvas {border: 1px dashed indianred;}']
})
export class Viz14Component implements OnInit, OnDestroy {
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  @Input() spriteWidth: number;
  @Input() spriteHeight: number;
  @Input() ticksPerFrame: number;
  @Input() imageUrl: string;
  @ViewChild('canvas') canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  cx: number; // center x
  cy: number; // center y
  numberOfFrames = frames.length;
  tickCount = 0;
  animating = false;
  sprite = new Image();
  emoteP: Emote;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.animating = true;
    this.emoteP = {
      // // start animating sprite at a random frame
      frame: getRandomInt(0, this.numberOfFrames),
      x: -this.spriteWidth / 2,
      y: -this.spriteHeight / 2
    };
    this.canvasWidth = this.spriteWidth;
    this.canvasHeight = this.spriteHeight;
    this.cx = this.canvasWidth / 2;
    this.cy = this.canvasHeight / 2;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.sprite.src = this.imageUrl;
    this.sprite.onload = () => this.ngZone.runOutsideAngular(() => this.animLoop());
    // TEMPORARY so that it doesn't run too long while testing
    // setTimeout(() => this.animating = false, 60000);
    console.log('numberOfFrames:', this.numberOfFrames);
  }

  animLoop() {
    // console.log('animation loop animating:', this.animating);
    this.update();
    this.render();

    if (this.animating) {
      requestAnimationFrame(() => this.animLoop());
    }
  }

  update() {
    this.tickCount++;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.emoteP.frame < this.numberOfFrames - 1) {
        // go to next frame
        return this.emoteP.frame++;
      } else {
        return this.emoteP.frame = 0;
      }
    }
    // console.log('UPDATE the frame number:', this.emoteP.frame);
    // NOTE: 'ticksPerFrame' to govern animation speed based on sprite-animation-demo - see article:
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  }

  render() {
    const frame = frames[this.emoteP.frame];
    // console.log('RENDER sprite, this.emoteP.frame:', this.emoteP.frame, 'frame:', frame);

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
    this.animating = false;
    console.log('viz13 component destroyed! Animating:', this.animating);
  }
}
