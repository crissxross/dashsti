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
  spriteWidth = 82;
  spriteHeight = 82;
  ticksPerFrame = 1;
  // imageUrl = '../../../assets/pPos1radial.png';
  imageUrl = '../../../assets/pPos0.9.png';
  duration = 2;

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
    this.sprites.forEach(sprite => this.createSpriteTl());
    // this.sprites.forEach(sprite => this.randomMoveSprite());

  }

  createSpriteTl() {
    const tl = new TimelineMax({delay: 3, repeat: -1, yoyo: true});
    tl.add(this.randomMoveSprite(), 'start');
    tl.add(this.randomRotateSprite(), 'start');
    tl.add(this.randomOpacitySprite(), 'start');
    tl.add(this.randomSkewSprite(), 'start');
    tl.add(this.randomScaleSprite(), 'start');
    for (let i = 0; i < 2; i++) {
      tl.addLabel('i', '+=0' );
      tl.add(this.randomMoveSprite(), 'i');
      tl.add(this.randomRotateSprite(), 'i');
      tl.add(this.randomOpacitySprite(), 'i');
      tl.add(this.randomSkewSprite(), 'i');
      tl.add(this.randomScaleSprite(), 'i');
    }
    return tl;
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
    return index < 5 ? index * this.spriteWidth
          : index > 9 ? (index - 10) * this.spriteWidth
          : (index - 5) * this.spriteWidth;
  }

  setY(index: number, target: any) {
    return index < 5 ? 0
          : index > 9 ? this.spriteHeight * 2
          : this.spriteHeight;
  }

  randomMoveSprite() {
    // console.log('randomMoveSprite called');
    const offsetX = getRandomInt(7, 30);
    const offsetY = getRandomInt(2, 10);
    const moveX = getRandomInt(-offsetX, offsetX);
    const moveY = getRandomInt(-offsetY, offsetY);
    return TweenMax.to('.emote', this.duration, {
      // x: () => getRandomInt(0, 300),
      // y: () => getRandomInt(0, 200),
      x: `+=${moveX}`,
      y: `+=${moveY}`,
      ease: Power1.easeInOut,
    });
  }

  randomRotateSprite() {
    return TweenMax.to('.emote', this.duration, {
      rotation: () => getRandomInt(90, 340),
      ease: Power1.easeInOut,
    });
  }

  randomOpacitySprite() {
    return TweenMax.to('.emote', this.duration, {
      opacity: () => getRandom(0.4, 0.7),
      ease: Power2.easeInOut,
    });
  }

  randomSkewSprite() {
    return TweenMax.to('.emote', this.duration, {
      skewX: () => getRandomInt(10, 60),
      ease: Power2.easeInOut,
    });
  }

  randomScaleSprite() {
    return TweenMax.to('.emote', this.duration, {
      scale: () => getRandom(0.5, 1),
      ease: Power2.easeInOut,
    });
  }
}

// ALTERNATIVE WAY:

// setX(index: number, target: any) {
  //   if (index < 5) {
  //     return index * this.spriteWidth;
  //   } else if (index > 9) {
  //     return (index - 10) * this.spriteWidth;
  //   } else {
  //     return (index - 5) * this.spriteWidth;
  //   }
  // }

  // setY(index: number, target: any) {
  //   if (index < 5) {
  //     return 0;
  //   } else if (index > 9) {
  //     return this.spriteHeight * 2;
  //   } else {
  //     return this.spriteHeight;
  //   }
  // }


  //  THIS DOES NOT WORK:

  // randomMoveSprite() {
  //   // console.log('randomMoveSprite called');
  //   this.sprites.forEach(sprite => {
  //     const offsetX = getRandomInt(7, 30);
  //     const offsetY = getRandomInt(2, 10);
  //     const moveX = getRandomInt(-offsetX, offsetX);
  //     const moveY = getRandomInt(-offsetY, offsetY);
  //     return TweenMax.to('.emote', this.duration, {
  //       opacity: () => getRandom(0.4, 0.7),
  //       // rotation: () => getRandomInt(0, 340),
  //       // x: () => getRandomInt(0, 300),
  //       // y: () => getRandomInt(0, 200),
  //       x: `+=${moveX}`,
  //       y: `+=${moveY}`,
  //       ease: Power1.easeInOut,
  //     });

  //   });
  // }
