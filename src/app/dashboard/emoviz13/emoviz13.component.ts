import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweenMax, TimelineMax, Circ, Power1, Power2, Power3, Power4 } from 'gsap';
import { Viz13Component } from './viz13.component';
import { getRandom, getRandomInt } from '../../shared/utils';

@Component({
  selector: 'app-emoviz13',
  templateUrl: './emoviz13.component.html',
  styleUrls: ['./emoviz13.component.css']
})
export class Emoviz13Component implements OnInit, AfterViewInit {
  @ViewChildren(Viz13Component)
  public sprites: QueryList<Viz13Component>;
  numOfSprites = 15; // input? as in gsap-lights
  // TEMPORARY PAD values to fix compile errors
  P = 0;
  A = 0;
  D = 0;

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
    // this.sprites.forEach(sprite => this.randomMoveSprite());
    this.sprites.forEach(sprite => this.createSpriteTl());
    // this.sprites.forEach(sprite => this.createSpriteTl2());

  }

  initSpriteGrid() {
    return this.sprites.forEach(sprite => {
      return TweenMax.set('.emote', {
        x: (index: number, target: any) => {
          if (index < 5) {
            return index * 80;
          } else if (index > 9) {
            return (index - 10) * 80;
          } else {
            return (index - 5) * 80;
          }
        },
        y: (index: number, target: any) => {
          if (index < 5) {
            return 10;
          } else if (index > 9) {
            return 170;
          } else {
            return 90;
          }
        },
      });
    });
  }

  randomMoveSprite() {
    // console.log('randomMoveSprite called');
    const offsetX = getRandomInt(7, 30);
    const offsetY = getRandomInt(5, 20);
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

  // DOES NOT WORK - it seems that TweenMax/TimelineMax callbacks don't work in Angular
  createSpriteTl2() {
    const tl = new TimelineMax({delay: 4, onComplete: this.createSpriteTl2});
    console.log('createSpriteTl2 Two called');
    tl.add(this.randomMoveSprite());
    return tl;
  }

}

// NOTES for REFERENCE:

// Alternative way using conditional ternary operator - but I think readability suffers like this:

// return TweenMax.set('.emote', {
  // x: (index: number, target: any) => {
  //   return index < 5 ? index * 80
  //         : index > 9 ? (index - 10) * 80
  //         : (index - 5) * 80;
  // },
  // y: (index: number, target: any) => {
  //   return index < 5 ? 10
  //         : index > 9 ? 170
  //         : 90;
  // },
// });

// THIS WORKS because tween targets '.emote' CSS CLASS
    // this.sprites.forEach(sprite => {
    //   return TweenMax.to('.emote', 1, {
    //     opacity: () => getRandom(0.4, 0.7),
    //     rotation: () => getRandom(0, 280),
    //     x: () => Math.random() * 300,
    //     y: () => Math.random() * 200
    //   });
    // });

  // THESE DO NOT WORK
    // this.sprites.forEach(sprite => TweenMax.to('i', 2, {y: '+=100'}));
    // this.sprites.forEach(sprite => TweenMax.to(sprite, 2, {opacity: 0.5}));
    // TweenMax.staggerTo(this.sprites, 1, {y: '+=100', opacity: 0.5}, 0.5);
