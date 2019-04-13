import { Component, AfterViewInit, OnInit, Input, ViewChild, ElementRef, OnChanges, OnDestroy, NgZone } from '@angular/core';
import { TweenLite, TweenMax, TimelineMax } from 'gsap';
import { Linear } from 'gsap';

import { frames } from '../spritesheet-data/pPos1radial';

@Component({
  selector: 'app-viz12',
  template: `
  <p>
    viz12 - but gsap + canvas animation code doesn't work!!!
  </p>
    <canvas #canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
  `,
  styles: ['canvas {border: 1px dashed grey;}']
})
export class Viz12Component implements OnChanges, OnInit, OnDestroy {
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
  // private emoteP: any;

  emoteP = {
    // if animating rotation
    rotation: 0,
    frame: 0,
    // half width & height of frame sourceSize
    x: -this.frameSrcSize / 2,
    y: -this.frameSrcSize / 2
  };

  constructor(private ngZone: NgZone) {
    // this.emoteP = {
    //   rotation: 0,
    //   frame: 0,
    //   x: -this.frameSrcSize / 2,
    //   y: -this.frameSrcSize / 2
    // };
   }

  ngOnInit() {
    this.running = true;
    // this.running = false;
    TweenLite.defaultEase = Linear.easeNone;
    this.sprite.src = this.imageLoc;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.sprite.onload = () => this.initTimeline();
    // this.sprite.onload = this.ngZone.runOutsideAngular(() => this.initTimeline());
    // this.sprite.onload = () => {
    //   const tl = new TimelineMax({ onUpdate: this.update });
    //   tl.to(this.emoteP, 1, { frame: frames.length - 1, roundProps: 'frame', repeat: -1 }, 0);
    //   return tl;
    // }

    console.log('viz12 OnInit! Running:', this.running);

    // this.sprite.onload = () => this.ngZone.run(() =>
    //   TweenMax.to(this.emoteP, 1, { frame: frames.length - 1, roundProps: 'frame', onUpdate: this.update, repeat: -1 })
    // );
  }

  // ngAfterViewInit() {
  //   this.sprite.onload = () => this.initTimeline();
  // }

  initTimeline() {
    console.log('sprite.onload so init timeline!', 'frames.length is', frames.length);

    this.update(); // just proving image loads & shows

    // this.ngZone.runOutsideAngular(() => {
    //   const tl = new TimelineMax({ onUpdate: this.update });
    //   tl.to(this.emoteP, 1, { frame: frames.length - 1, roundProps: 'frame', repeat: -1 }, 0);
    // });

    // const tl = new TimelineMax({onUpdate: this.ngZone.run(() => this.update)});
    // tl.to(this.emoteP, 1, { frame: frames.length - 1, roundProps: 'frame', repeat: -1 }, 0);



    // const tl = new TimelineMax({ onUpdate: this.update });
    // tl.to(this.emoteP, 1, { frame: frames.length - 1, roundProps: 'frame', repeat: -1 }, 0);

    // tl.timeScale(0.5);
  //   NOTE: TESTING USE OF TIMESCALE

    // return tl;


  }

  update() {
    // Check that we're still running.
    // if (!this.running) {
    //   return;
    // }
    // console.log('onUpdate called update()');

    const frame = frames[this.emoteP.frame];
    // console.log('frames.length:', frames.length, 'this.emoteP.frame:', this.emoteP.frame, 'frame:', frame);

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

  ngOnChanges() {
    console.log('ngOnChanges called');
    // this.sprite.onload = () => this.initTimeline();
  }

  ngOnDestroy() {
    this.running = false;
    console.log('viz12 component destroyed! Running:', this.running);
  }

}
