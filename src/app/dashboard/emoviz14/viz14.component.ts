import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { TweenMax, TimelineMax, Circ, Power1, Power2, Power3, Power4, RoughEase, Power0, RoughEaseConfig } from 'gsap';

// import { frames } from '../spritesheet-data/pPos1radial';
import { frames } from '../spritesheet-data/pPos0.9';
import { getRandomInt, getRandom } from '../../shared/utils';
import { SpriteComponent } from './sprite.component';

interface Emote {
  frame: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-viz14',
  template: `
  <div #sprite>
    <app-sprite
      [P]=P
      [A]=A
      [D]=D
      [spriteWidth]=spriteWidth
      [spriteHeight]=spriteHeight
      [ticksPerFrame]=ticksPerFrame
      [imageUrl]=imageUrl
      [isAnimating]=animating
    ></app-sprite>
  </div>
  `,
  styles: [':host {border: 1px dashed hsla(0, 0%, 0%, 0);}']
})
export class Viz14Component implements OnInit, OnDestroy, AfterViewInit {
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;
  @Input() spriteWidth: number;
  @Input() spriteHeight: number;
  @Input() ticksPerFrame: number;
  @Input() imageUrl: string;
  // @ViewChild(SpriteComponent) emote: SpriteComponent;
  @ViewChild('sprite') private _sprite: ElementRef;
  duration = 2; // TODO: @Input?
  animating = false;
  tl: TimelineMax; // need tl for ngOnDestroy
  roughEaseDefault = RoughEase.ease;
  roughEase1 = new RoughEase({
    clamp: false, // default false
    points: 20, // default 20
    randomize: true, // default true
    strength: 1, // default 1
    taper: 'none', // default none
    template:  Power0.easeNone, // default Linear.easeNone
  });

  private get sprite(): HTMLElement {
    return this._sprite.nativeElement;
  }

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.animating = true;
    // just TESTING kill
    // setTimeout(() => {
    //   this.tl.kill();
    //   this.animating = false;
    // }, 8000);
  }

  ngAfterViewInit() {
    this.createSpriteTl();
  }

  createSpriteTl() {
    // this.tl = new TimelineMax({delay: 2, repeat: -1, yoyo: true});
    this.tl = new TimelineMax({
      onComplete: this.createSpriteTl,
      callbackScope: this, // important, will not work without this
    });
    this.tl.add(this.randomMove(), 'start');
    this.tl.add(this.randomOpacity(), 'start');
    this.tl.add(this.randomRotate(), 'start');
    this.tl.add(this.randomSkew(), 'start');
    this.tl.add(this.randomScale(), 'start');
    this.tl.addCallback(this.testCallback, 'start', ['START']);
    // this.tl.call(this.testCallback, ['(start) finish call']);
    // this.tl.addLabel('end', '+=0');
    // NOTE: BELOW WAS TEMPORARY WORKAROUND UNTIL I FIXED WITH callbackScope
    // for (let i = 0; i < 3; i++) {
    //   this.tl.addLabel('i', '+=0' );
    //   this.tl.add(this.randomMove(), 'i');
    //   this.tl.add(this.randomOpacity(), 'i');
    //   this.tl.add(this.randomRotate(), 'i');
    //   this.tl.add(this.randomSkew(), 'i');
    //   this.tl.add(this.randomScale(), 'i');
    //   this.tl.addCallback(this.testCallback, 'i', ['addCallback at ' + i]);
    //   // this.tl.call(this.testCallback, ['call finish of ' + i]);
    // }
    return this.tl;
  }

  testCallback(label: any) {
    console.log('testCallback label', label);
  }

  randomMove() {
    // console.log('randomMove called');
    const offsetX = getRandomInt(7, 50);
    const offsetY = getRandomInt(2, 30);
    const moveX = getRandomInt(-offsetX, offsetX);
    const moveY = getRandomInt(-offsetY, offsetY);
    // console.log('moveX', moveX, 'moveY', moveY);
    const tween = new TweenMax(this.sprite, this.duration, {
      x: () => getRandomInt(-50, 100),
      y: () => getRandomInt(-20, 50),
      // x: `+=${moveX}`,
      // y: `+=${moveY}`,
      repeat: 1,
      yoyo: true,
      ease: Power1.easeInOut,
      // ease: this.roughEase1,
      // ease: this.roughEaseDefault,
      // onComplete: this.randomMove,
      // callbackScope: this
    });
    return tween;
  }

  randomRotate() {
    return TweenMax.to(this.sprite, this.duration, {
      rotation: () => getRandomInt(90, 340),
      ease: Power1.easeInOut,
      // repeat: -1,
      // yoyo: true,
    });
  }

  randomOpacity() {
    return TweenMax.to(this.sprite, this.duration, {
      opacity: () => getRandom(0.4, 0.7),
      ease: Power2.easeInOut,
    });
  }

  randomSkew() {
    return TweenMax.to(this.sprite, this.duration, {
      skewX: () => getRandomInt(10, 30),
      ease: Power2.easeInOut,
      // onComplete: this.randomSkew,
      // callbackScope: this
    });
  }

  randomScale() {
    return TweenMax.to(this.sprite, this.duration, {
      scale: () => getRandom(0.75, 1.5),
      ease: Power2.easeInOut,
      // repeat: -1,
      // yoyo: true,
    });
  }

  ngOnDestroy() {
    this.animating = false;
    this.tl.kill();
    console.log('viz14 component destroyed! Animating:', this.animating);
  }

}
