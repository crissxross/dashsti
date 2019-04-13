import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';

// import { frames } from '../spritesheet-data/pPos1radial';
import { frames } from '../spritesheet-data/pPos0.9';
import { getRandomInt } from '../../shared/utils';

@Component({
  selector: 'app-viz13',
  template: `
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: []
})
export class Viz13Component implements OnInit, OnDestroy {
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  // @Input() canvasWidth: number;
  // @Input() canvasHeight: number;
  @ViewChild('canvas') canvasRef: ElementRef;s
  ctx: CanvasRenderingContext2D;
  frameSrcSize = 80; // TODO: input
  canvasWidth = this.frameSrcSize;
  canvasHeight = this.frameSrcSize;
  // center
  cx = this.canvasWidth / 2;
  cy = this.canvasHeight / 2;
  sprite = new Image();
  // imageUrl = '../../../assets/pPos1radial.png';
  imageUrl = '../../../assets/pPos0.9.png';
  tickCount = 0;
  ticksPerFrame = 1; // TODO: input
  numberOfFrames = frames.length;
  animating = false;

  emoteP = {
    frame: 0,
    // half width & height of frame sourcesize
    x: -this.frameSrcSize / 2,
    y: -this.frameSrcSize / 2
  };

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // start animating sprite at a random frame
    this.emoteP.frame = getRandomInt(0, this.numberOfFrames);
    this.animating = true;
    this.sprite.src = this.imageUrl;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
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
