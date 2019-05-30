import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { TimelineMax, Linear } from 'gsap';

import { frames } from '../spritesheet-data/pPos1radial';
// import { frames } from '../spritesheet-data/pPos0.9';
import { getRandomInt } from '../../shared/utils';

interface Emote {
  frame: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-sprite15',
  template: `
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: ['canvas {border: 1px dashed hsla(0, 50%, 50%, 0);}']
})
export class Sprite15Component implements OnInit, OnDestroy {
// TODO: emote sprite is for Pleasure dimension so do I need A & D here?
  // although Arousal could govern ticksPerFrame, i.e. speed of sprite anim
  // TODO: but PAD governed by smart ancestor component so may not need PAD here at all ??
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  @Input() spriteWidth: number;
  @Input() spriteHeight: number;
  @Input() ticksPerFrame: number;
  @Input() imageUrl: string;
  @Input() isAnimating: boolean;
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  cx: number; // center x
  cy: number; // center y
  numberOfFrames = frames.length;
  tickCount = 0;
  sprite = new Image();
  emoteP: Emote;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.emoteP = {
      // // start animating sprite at a random frame
      // frame: getRandomInt(0, this.numberOfFrames),
      frame: 0,
      x: -this.spriteWidth / 2,
      y: -this.spriteHeight / 2
    };
    this.canvasWidth = this.spriteWidth;
    this.canvasHeight = this.spriteHeight;
    this.cx = this.canvasWidth / 2;
    this.cy = this.canvasHeight / 2;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.sprite.src = this.imageUrl;
    // this.sprite.onload = () => this.ngZone.runOutsideAngular(() => this.initTimeline());
    this.sprite.onload = () => this.ngZone.runOutsideAngular(() => this.randomStart());
    // this.sprite.onload = () => this.initTimeline();
    this.update();

    // TEMPORARY so that it doesn't run too long while testing
    // setTimeout(() => this.isAnimating = false, 60000);
    console.log('numberOfFrames:', this.numberOfFrames, 'animating?', this.isAnimating);
  }

  randomStart() {
    setTimeout(() => this.initTimeline(), getRandomInt(0, 1000));
  }

  initTimeline() {
    // console.log('initTimeline');
    const tl = new TimelineMax({
      onUpdate: this.update,
      onUpdateScope: this,
    });
    tl.to(this.emoteP, 1, {
        frame: frames.length - 1,
        roundProps: 'frame',
        ease: Linear.easeNone,
        repeat: -1,
      }, 0);

      tl.timeScale(0.5); // TESTING USE OF TIMESCALE
      // return tl;
    }

  update() {
    // Check that we're still animating
    if (!this.isAnimating) {
      return;
    }
    const frame = frames[this.emoteP.frame];

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
    this.isAnimating = false;
    console.log('sprite component destroyed! animating:', this.isAnimating);
  }


}
