import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweenMax, TimelineMax, Circ, Power1, Power2, Power3, Power4 } from 'gsap';

import { getRandom, getRandomInt } from '../../shared/utils';
import { Viz14Component } from './viz14.component';

@Component({
  selector: 'app-emoviz14',
  templateUrl: './emoviz14.component.html',
  styleUrls: ['./emoviz14.component.css']
})
export class Emoviz14Component implements OnInit, AfterViewInit {
  @ViewChildren(Viz14Component)
  public sprites: QueryList<Viz14Component>;
  numOfSprites = 15; // input? as in gsap-lights
  spriteSize = 82;

  constructor() { }

  // this technique from gsap-lights [tuts/angular/gsap-lights]
  get sizeArray() {
    return new Array(this.numOfSprites);
  }

  ngOnInit() {
    // creates a fade in
    TweenMax.from('.viz-container', 4, {opacity: 0});
  }

  ngAfterViewInit() {
    // this.sprites.forEach(sprite => console.log('ngAfterViewInit sprite:', sprite));

    this.sprites.forEach(sprite => this.initSpriteGrid());
    // this.sprites.forEach(sprite => this.createSpriteTl());
    // this.sprites.forEach(sprite => this.randomMoveSprite());

  }

  initSpriteGrid() {
    return this.sprites.forEach(sprite => {
      return TweenMax.set('.emote', {
        x: (index: number, target: any) => this.setX(index, target),
        y: (index: number, target: any) => this.setY(index, target),
      });
    });
  }

  setX(index: number, target: any) {
    if (index < 5) {
      return index * this.spriteSize;
    } else if (index > 9) {
      return (index - 10) * this.spriteSize;
    } else {
      return (index - 5) * this.spriteSize;
    }
  }

  setY(index: number, target: any) {
    if (index < 5) {
      return 0;
    } else if (index > 9) {
      return this.spriteSize * 2;
    } else {
      return this.spriteSize;
    }
  }

  randomMoveSprite() {
    // console.log('randomMoveSprite called');
    const offsetX = getRandomInt(7, 30);
    const offsetY = getRandomInt(2, 10);
    const moveX = getRandomInt(-offsetX, offsetX);
    const moveY = getRandomInt(-offsetY, offsetY);
    return TweenMax.to('.emote', 2, {
      opacity: () => getRandom(0.4, 0.7),
      rotation: () => getRandomInt(0, 340),
      // x: () => getRandomInt(0, 300),
      // y: () => getRandomInt(0, 200),
      x: `+=${moveX}`,
      y: `+=${moveY}`,
      ease: Power1.easeInOut,
      // onComplete: this.randomMoveSprite // does not work
    });
  }

  createSpriteTl() {
    const tl = new TimelineMax({delay: 3, repeat: -1, yoyo: true});
    for (let i = 0; i < 10; i++) {
      tl.add(this.randomMoveSprite());
    }
    return tl;
  }

}
