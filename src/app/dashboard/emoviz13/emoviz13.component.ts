import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweenMax } from 'gsap';
import { Viz13Component } from './viz13.component';
import { getRandom } from '../../shared/utils';

@Component({
  selector: 'app-emoviz13',
  templateUrl: './emoviz13.component.html',
  styleUrls: ['./emoviz13.component.css']
})
export class Emoviz13Component implements OnInit, AfterViewInit {
  @ViewChildren(Viz13Component)
  public sprites: QueryList<Viz13Component>;
  size = 16; // input? as in gsap-lights

  constructor() { }

  // this technique from gsap-lights [tuts/angular/gsap-lights]
  get sizeArray() {
    return new Array(this.size);
  }

  ngOnInit() {
    // Just testing
    // TweenMax.to('.canvas-container', 2, {x: '+=50'});
  }

  ngAfterViewInit() {
    // this.sprites.forEach(sprite => console.log('ngAfterViewInit sprite:', sprite));

    this.sprites.forEach(sprite => this.randomMoveSprite());

    // This works because tween targets the class
    // this.sprites.forEach(sprite => {
    //   return TweenMax.to('.emote', 1, {
    //     opacity: () => getRandom(0.4, 0.7),
    //     rotation: () => getRandom(0, 280),
    //     x: () => Math.random() * 300,
    //     y: () => Math.random() * 200
    //   });
    // });

  }

  randomMoveSprite() {
    return TweenMax.to('.emote', 1, {
      opacity: () => getRandom(0.4, 0.7),
      rotation: () => getRandom(0, 280),
      x: () => Math.random() * 300,
      y: () => Math.random() * 200,
    });
  }

  // Note for REFERENCE:
  // THESE DO NOT WORK
    // this.sprites.forEach(sprite => TweenMax.to('i', 2, {y: '+=100'}));
    // this.sprites.forEach(sprite => TweenMax.to(sprite, 2, {opacity: 0.5}));
    // TweenMax.staggerTo(this.sprites, 1, {y: '+=100', opacity: 0.5}, 0.5);

  // TODO: should I add the sprites to another canvas - so this component would be a canvas ?????

}
